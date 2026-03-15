const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const { upload, uploadToCloudinary } = require('../middleware/upload');
const { sendWelcomeEmail } = require('../utils/email');

// Generate unique 4-digit referral code
const generateReferralCode = async () => {
  let referralCode;
  let isUnique = false;
  
  while (!isUnique) {
    // Generate 4 random digits (1000-9999)
    referralCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Check if code already exists
    const existingUser = await User.findOne({ referralCode });
    if (!existingUser) {
      isUnique = true;
    }
  }
  
  return referralCode;
};

// Submit Registration - Creates User with pending status
router.post('/submit', upload.fields([
  { name: 'restaurantPhoto', maxCount: 1 },
  { name: 'businessRegistration', maxCount: 1 },
  { name: 'businessLicense', maxCount: 1 },
  { name: 'tin', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'menuSamples', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'photos', maxCount: 10 },
  { name: 'businessRegistrationCorporate', maxCount: 1 },
  { name: 'businessLicenseCorporate', maxCount: 1 }
]), uploadToCloudinary('registrations'), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    // Validate required fields
    if (!formData.email || !formData.password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Normalize email and trim password
    const normalizedEmail = formData.email.toLowerCase().trim();
    const trimmedPassword = formData.password.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    
    // If registering as vendor, check for orphaned vendor records
    if (userRole === 'vendor' && formData.registrationType === 'service-provider') {
      const existingVendor = await Vendor.findOne({ email: normalizedEmail });
      if (existingVendor) {
        // Check if there's a corresponding user
        const vendorUser = await User.findById(existingVendor.user);
        if (!vendorUser) {
          // Orphaned vendor record - delete it and allow registration
          console.log('Found orphaned vendor record, deleting:', existingVendor._id);
          await Vendor.findByIdAndDelete(existingVendor._id);
        } else {
          // Both vendor and user exist - already registered
          return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }
      }
    }

    if (!trimmedPassword) {
      return res.status(400).json({ success: false, message: 'Password cannot be empty' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Determine role based on registration type
    // Only allow: user, vendor, rider roles through registration form
    // Admin roles (superadmin, admin, support, marketing) must be created via Thunder Client/API
    let userRole = 'user';
    if (formData.registrationType === 'service-provider') {
      userRole = 'vendor';
    }
    
    // Ensure only public roles are allowed
    const allowedRoles = ['user', 'vendor', 'rider'];
    if (!allowedRoles.includes(userRole)) {
      userRole = 'user'; // Default to user if invalid role
    }

    // Generate unique 4-digit referral code
    const referralCode = await generateReferralCode();

    // Handle optional fields - convert empty strings to undefined
    if (formData.whatsapp === '') {
      formData.whatsapp = undefined;
    }
    if (formData.telegram === '') {
      formData.telegram = undefined;
    }

    // Determine fullName based on registration type
    let fullName = formData.fullName || formData.ownerManagerName || formData.contactPersonName || 'User';

    // Create User (consolidated from Registration model)
    const userData = {
      email: normalizedEmail,
      password: hashedPassword,
      fullName,
      phone: formData.phone,
      role: userRole,
      registrationStatus: 'pending', // Must be approved before sign-in
      registrationType: formData.registrationType,
      referralCode,
      // Registration fields
      serviceProviderType: formData.serviceProviderType,
      serviceSeekerType: formData.serviceSeekerType,
      businessName: formData.businessName,
      ownerManagerName: formData.ownerManagerName,
      whatsapp: formData.whatsapp,
      telegram: formData.telegram,
      businessType: formData.businessType,
      city: formData.city,
      primaryLocation: formData.primaryLocation,
      address: formData.address,
      companyName: formData.companyName,
      contactPersonName: formData.contactPersonName,
      // File attachments
      businessRegistration: files.businessRegistration?.[0]?.cloudinaryUrl || files.businessRegistrationCorporate?.[0]?.cloudinaryUrl,
      businessLicense: files.businessLicense?.[0]?.cloudinaryUrl || files.businessLicenseCorporate?.[0]?.cloudinaryUrl,
      tin: files.tin?.[0]?.cloudinaryUrl,
      certificate: files.certificate?.[0]?.cloudinaryUrl,
      menuSamples: files.menuSamples?.[0]?.cloudinaryUrl,
      video: files.video?.[0]?.cloudinaryUrl,
      photos: files.photos?.map(file => file.cloudinaryUrl) || [],
    };

    const user = new User(userData);
    await user.save();

    // If user is a service provider (vendor), create a Vendor record
    if (userRole === 'vendor' && formData.registrationType === 'service-provider') {
      // Map business type from frontend format to backend enum format
      const businessTypeMap = {
        'Restaurant ~ Tier 1': 'Restaurant Tier 1',
        'Restaurant ~ Tier 2': 'Restaurant Tier 2',
        'Catering Services ~ Tier 3': 'Catering Service',
        'Restaurant ~ Tier 4': 'Restaurant Tier 4',
        'Elite Restaurant ~ Tier 5': 'Elite Restaurant',
        'Others': 'Others',
        'Lounge': 'Lounge',
        'Night Club': 'Night Club'
      };
      const mappedBusinessType = businessTypeMap[formData.businessType] || formData.businessType || 'Others';
      
      const vendorData = {
        ownerName: formData.ownerManagerName || fullName,
        businessName: formData.businessName || 'Business Name',
        email: user.email,
        user: user._id,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        telegram: formData.telegram,
        businessType: mappedBusinessType,
        city: formData.city || '',
        primaryLocation: {
          address: formData.primaryLocation || '',
        },
        restaurantPhoto: files.restaurantPhoto?.[0]?.cloudinaryUrl,
        documents: {
          businessRegistration: files.businessRegistration?.[0]?.cloudinaryUrl,
          license: files.businessLicense?.[0]?.cloudinaryUrl,
          tin: files.tin?.[0]?.cloudinaryUrl,
          certificate: files.certificate?.[0]?.cloudinaryUrl,
          menuSamples: files.menuSamples?.[0]?.cloudinaryUrl ? [files.menuSamples[0].cloudinaryUrl] : [],
          promoVideo: files.video?.[0]?.cloudinaryUrl,
          photos: files.photos?.map(file => file.cloudinaryUrl) || [],
        },
        isVerified: false,
      };

      try {
        const vendor = new Vendor(vendorData);
        await vendor.save();
      } catch (vendorError) {
        // If vendor creation fails, log but don't fail the registration
        console.error('Error creating vendor record:', vendorError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Your account is pending approval. You will be able to sign in once approved.',
      data: {
        id: user._id,
        email: user.email,
        registrationStatus: user.registrationStatus,
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    // Return more detailed error information
    if (error.name === 'ValidationError') {
      const errors = Object.keys(error.errors || {}).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
