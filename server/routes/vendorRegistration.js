const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


// Vendor registration
router.post('/vendor', upload.fields([
  { name: 'restaurantPhoto', maxCount: 1 },
  { name: 'businessRegistration', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'tin', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'menuSamples', maxCount: 10 },
  { name: 'promoVideo', maxCount: 1 },
  { name: 'photos', maxCount: 20 },
  { name: 'videos', maxCount: 5 },
]), uploadToCloudinary('vendors'), async (req, res) => {
  try {
    const {
      ownerName,
      businessName,
      email,
      password,
      phone,
      whatsapp,
      telegram,
      businessType,
      city,
      primaryLocationAddress,
      primaryLocationLat,
      primaryLocationLng,
    } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      return res.status(400).json({ success: false, message: 'Password cannot be empty' });
    }

    // Check if user already exists (all users including vendors are in User model)
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Check if vendor already exists
    // If vendor exists but no user, it's an orphaned record - clean it up
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
        return res.status(400).json({ success: false, message: 'Vendor already registered' });
      }
    }

    const restaurantPhoto = req.files?.restaurantPhoto?.[0]?.cloudinaryUrl || null;
    
    // Map business type from frontend format to backend enum format
    const businessTypeMap = {
      'Restaurant ~ Tier 1': 'Restaurant Tier 1',
      'Restaurant ~ Tier 2': 'Restaurant Tier 2',
      'Catering Services ~ Tier 3': 'Catering Service',
      'Restaurant ~ Tier 4': 'Restaurant Tier 4',
      'Elite Restaurant ~ Tier 5': 'Elite Restaurant',
      'Others': 'Others'
    };
    const mappedBusinessType = businessTypeMap[businessType] || businessType || 'Others';
    
    const documents = {
      businessRegistration: req.files?.businessRegistration?.[0]?.cloudinaryUrl || null,
      license: req.files?.license?.[0]?.cloudinaryUrl || null,
      tin: req.files?.tin?.[0]?.cloudinaryUrl || null,
      certificate: req.files?.certificate?.[0]?.cloudinaryUrl || null,
      menuSamples: req.files?.menuSamples
        ? req.files.menuSamples.map((file) => file.cloudinaryUrl)
        : [],
      promoVideo: req.files?.promoVideo?.[0]?.cloudinaryUrl || null,
      photos: req.files?.photos
        ? req.files.photos.map((file) => file.cloudinaryUrl)
        : [],
      videos: req.files?.videos
        ? req.files.videos.map((file) => file.cloudinaryUrl)
        : [],
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Generate unique 4-digit referral code
    const referralCode = await generateReferralCode();

    // Create user account with role='vendor' (all authentication through User model)
    // Vendor registrations require approval before sign-in
    const user = new User({
      email: normalizedEmail,
      password: hashedPassword,
      fullName: ownerName,
      phone,
      role: 'vendor',
      referralCode,
      registrationStatus: 'pending', // Must be approved before sign-in
      registrationType: 'service-provider',
      serviceProviderType: 'food-vendor',
    });

    await user.save();

    // Parse location coordinates safely - only set if valid numbers
    const lat = primaryLocationLat && !isNaN(parseFloat(primaryLocationLat)) 
      ? parseFloat(primaryLocationLat) 
      : undefined;
    const lng = primaryLocationLng && !isNaN(parseFloat(primaryLocationLng)) 
      ? parseFloat(primaryLocationLng) 
      : undefined;

    // Create vendor record for business data (linked to user)
    const vendor = new Vendor({
      ownerName,
      businessName,
      email: normalizedEmail,
      user: user._id, // Link to User model
      phone,
      whatsapp: whatsapp || undefined, // Optional field
      telegram: telegram || undefined, // Optional field
      businessType: mappedBusinessType,
      city,
      restaurantPhoto,
      primaryLocation: {
        address: primaryLocationAddress || '',
        ...(lat !== undefined && { lat }),
        ...(lng !== undefined && { lng }),
      },
      ...(lat !== undefined && lng !== undefined && {
        location: {
          lat,
          lng,
        }
      }),
      documents,
      isVerified: false,
    });

    try {
      await vendor.save();
    } catch (vendorError) {
      // If vendor creation fails, delete the user and return error
      await User.findByIdAndDelete(user._id);
      console.error('Vendor creation error:', vendorError);
      if (vendorError.name === 'ValidationError') {
        const errors = Object.keys(vendorError.errors || {}).map(key => ({
          field: key,
          message: vendorError.errors[key].message
        }));
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors 
        });
      }
      throw vendorError;
    }

    // Generate JWT token for immediate login (using userId)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send welcome email with referral code (don't wait for it to complete)
    sendWelcomeEmail(normalizedEmail, ownerName, referralCode).catch((error) => {
      console.error('Failed to send welcome email:', error);
      // Don't fail the registration if email fails
    });

    res.status(201).json({
      success: true,
      message: 'Vendor registration submitted successfully. Your account is pending approval. You will be able to sign in once approved.',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        registrationStatus: user.registrationStatus,
      },
      vendor: {
        id: vendor._id,
        businessName: vendor.businessName,
        email: vendor.email,
      },
    });
  } catch (error) {
    console.error('Vendor registration error:', error);
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

// Lounge/Night Club registration
router.post('/lounge', upload.fields([
  { name: 'businessRegistration', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'photos', maxCount: 20 },
  { name: 'menu', maxCount: 10 },
  { name: 'video', maxCount: 1 },
]), uploadToCloudinary('vendors'), async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      phone,
      email,
      password,
      whatsapp,
      telegram,
      businessType,
      city,
      primaryLocationAddress,
      primaryLocationLat,
      primaryLocationLng,
    } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      return res.status(400).json({ success: false, message: 'Password cannot be empty' });
    }

    // Check if user already exists (all users including vendors are in User model)
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Check if vendor already exists
    // If vendor exists but no user, it's an orphaned record - clean it up
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
        return res.status(400).json({ success: false, message: 'Business already registered' });
      }
    }

    const documents = {
      businessRegistration: req.files?.businessRegistration?.[0]?.cloudinaryUrl || null,
      license: req.files?.license?.[0]?.cloudinaryUrl || null,
      photos: req.files?.photos
        ? req.files.photos.map((file) => file.cloudinaryUrl)
        : [],
      menuSamples: req.files?.menu
        ? req.files.menu.map((file) => file.cloudinaryUrl)
        : [],
      promoVideo: req.files?.video?.[0]?.cloudinaryUrl || null,
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Generate unique 4-digit referral code
    const referralCode = await generateReferralCode();

    // Create user account with role='vendor' (all authentication through User model)
    // Vendor registrations require approval before sign-in
    const user = new User({
      email: normalizedEmail,
      password: hashedPassword,
      fullName: ownerName,
      phone,
      role: 'vendor',
      referralCode,
      registrationStatus: 'pending', // Must be approved before sign-in
      registrationType: 'service-provider',
      serviceProviderType: 'lounge-nightclub',
    });

    await user.save();

    // Parse location coordinates safely - only set if valid numbers
    const lat = primaryLocationLat && !isNaN(parseFloat(primaryLocationLat)) 
      ? parseFloat(primaryLocationLat) 
      : undefined;
    const lng = primaryLocationLng && !isNaN(parseFloat(primaryLocationLng)) 
      ? parseFloat(primaryLocationLng) 
      : undefined;

    // Create vendor record for business data (linked to user)
    const vendor = new Vendor({
      ownerName,
      businessName,
      email: normalizedEmail,
      user: user._id, // Link to User model
      phone,
      whatsapp: whatsapp || undefined, // Optional field
      telegram: telegram || undefined, // Optional field
      businessType: businessType || 'Lounge',
      city,
      primaryLocation: {
        address: primaryLocationAddress || '',
        ...(lat !== undefined && { lat }),
        ...(lng !== undefined && { lng }),
      },
      ...(lat !== undefined && lng !== undefined && {
        location: {
          lat,
          lng,
        }
      }),
      documents,
      isVerified: false,
    });

    await vendor.save();

    // Send welcome email with referral code (don't wait for it to complete)
    sendWelcomeEmail(email, ownerName, referralCode).catch((error) => {
      console.error('Failed to send welcome email:', error);
      // Don't fail the registration if email fails
    });

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Your account is pending approval. You will be able to sign in once approved.',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        registrationStatus: user.registrationStatus,
      },
      vendor: {
        id: vendor._id,
        businessName: vendor.businessName,
        email: vendor.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
