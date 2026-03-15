const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Vendor = require('../models/Vendor');
const Cart = require('../models/Cart');
const { authenticate, authorize } = require('../middleware/auth');
const { upload, uploadToCloudinary } = require('../middleware/upload');

// Get all menu items (public or filtered by vendor)
router.get('/', async (req, res) => {
  try {
    let query = {};

    // Check if user is authenticated and is a vendor
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const User = require('../models/User');
        const user = await User.findById(decoded.userId);
        
        if (user && user.role === 'vendor') {
          // Vendor can see all their items (including unavailable)
          let vendor = await Vendor.findOne({ user: decoded.userId });
          
          // If vendor record doesn't exist, create one from user data
          if (!vendor) {
            // Ensure required fields have valid values (not empty strings)
            const vendorCity = (user.city && user.city.trim()) ? user.city.trim() : 'Not Specified';
            const vendorPhone = (user.phone && user.phone.trim()) ? user.phone.trim() : '0000000000';
            const vendorBusinessName = (user.businessName && user.businessName.trim()) ? user.businessName.trim() : 'Business Name';
            const vendorOwnerName = (user.ownerManagerName && user.ownerManagerName.trim()) ? user.ownerManagerName.trim() : (user.fullName || 'Owner');
            
            vendor = new Vendor({
              ownerName: vendorOwnerName,
              businessName: vendorBusinessName,
              email: user.email,
              user: user._id,
              phone: vendorPhone,
              whatsapp: user.whatsapp,
              telegram: user.telegram,
              businessType: user.businessType || 'Others',
              city: vendorCity,
              primaryLocation: {
                address: user.primaryLocation || '',
              },
              documents: {
                businessRegistration: user.businessRegistration,
                license: user.businessLicense,
                tin: user.tin,
                certificate: user.certificate,
                menuSamples: user.menuSamples ? [user.menuSamples] : [],
                promoVideo: user.video,
                photos: user.photos || [],
              },
              isVerified: false,
            });
            
            try {
              await vendor.save();
            } catch (vendorError) {
              // If vendor creation fails, try to find existing one by email
              vendor = await Vendor.findOne({ email: user.email });
            }
          }
          
          if (vendor) {
            query.vendor = vendor._id;
          } else {
            return res.json({ success: true, menuItems: [] });
          }
        } else {
          // Non-vendor authenticated users see only available items
          query.isAvailable = true;
          if (req.query.vendorId) {
            query.vendor = req.query.vendorId;
          }
        }
      } catch (err) {
        // Invalid token, treat as public
        query.isAvailable = true;
        if (req.query.vendorId) {
          query.vendor = req.query.vendorId;
        }
      }
    } else {
      // Public access - only show available items
      query.isAvailable = true;
      if (req.query.vendorId) {
        query.vendor = req.query.vendorId;
      }
    }

    const menuItems = await MenuItem.find(query)
      .populate('vendor', 'businessName')
      .sort({ createdAt: -1 });

    res.json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('vendor');
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create menu item (vendor only)
router.post('/', authenticate, authorize('vendor'), upload.single('image'), uploadToCloudinary('menu'), async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ user: req.userId });
    
    // If vendor record doesn't exist, create one from user data
    if (!vendor) {
      console.log('Vendor record not found, creating from user data for user:', req.userId);
      
      // Get user data to populate vendor record
      const User = require('../models/User');
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Create basic vendor record from user registration data
      // Ensure required fields have valid values
      const vendorCity = user.city && user.city.trim() ? user.city.trim() : 'Not Specified';
      const vendorPhone = user.phone && user.phone.trim() ? user.phone.trim() : '0000000000';
      const vendorBusinessName = user.businessName && user.businessName.trim() ? user.businessName.trim() : 'Business Name';
      const vendorOwnerName = user.ownerManagerName && user.ownerManagerName.trim() ? user.ownerManagerName.trim() : (user.fullName || 'Owner');
      
      vendor = new Vendor({
        ownerName: vendorOwnerName,
        businessName: vendorBusinessName,
        email: user.email,
        user: user._id,
        phone: vendorPhone,
        whatsapp: user.whatsapp,
        telegram: user.telegram,
        businessType: user.businessType || 'Others',
        city: vendorCity,
        primaryLocation: {
          address: user.primaryLocation || '',
        },
        documents: {
          businessRegistration: user.businessRegistration,
          license: user.businessLicense,
          tin: user.tin,
          certificate: user.certificate,
          menuSamples: user.menuSamples ? [user.menuSamples] : [],
          promoVideo: user.video,
          photos: user.photos || [],
        },
        isVerified: false,
      });
      
      try {
        await vendor.save();
        console.log('Vendor record created successfully:', vendor._id);
      } catch (vendorError) {
        console.error('Error creating vendor record:', vendorError);
        // If vendor creation fails (e.g., duplicate email), try to find existing one
        vendor = await Vendor.findOne({ email: user.email });
        if (!vendor) {
          return res.status(500).json({ 
            success: false, 
            message: 'Failed to create vendor profile. Please contact support.' 
          });
        }
      }
    }

    const { name, description, price, category, tags, isAvailable } = req.body;

    const menuItem = new MenuItem({
      vendor: vendor._id,
      name,
      description,
      price: parseFloat(price),
      category,
      tags: tags ? tags.split(',') : [],
      isAvailable: isAvailable !== 'false',
      imageUrl: req.file?.cloudinaryUrl || null,
    });

    await menuItem.save();
    res.status(201).json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update menu item (vendor only)
router.patch('/:id', authenticate, authorize('vendor'), upload.single('image'), uploadToCloudinary('menu'), async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ user: req.userId });
    
    // If vendor record doesn't exist, create one from user data
    if (!vendor) {
      const User = require('../models/User');
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Ensure required fields have valid values (not empty strings)
      const vendorCity = (user.city && user.city.trim()) ? user.city.trim() : 'Not Specified';
      const vendorPhone = (user.phone && user.phone.trim()) ? user.phone.trim() : '0000000000';
      const vendorBusinessName = (user.businessName && user.businessName.trim()) ? user.businessName.trim() : 'Business Name';
      const vendorOwnerName = (user.ownerManagerName && user.ownerManagerName.trim()) ? user.ownerManagerName.trim() : (user.fullName || 'Owner');
      
      vendor = new Vendor({
        ownerName: vendorOwnerName,
        businessName: vendorBusinessName,
        email: user.email,
        user: user._id,
        phone: vendorPhone,
        whatsapp: user.whatsapp,
        telegram: user.telegram,
        businessType: user.businessType || 'Others',
        city: vendorCity,
        primaryLocation: {
          address: user.primaryLocation || '',
        },
        documents: {
          businessRegistration: user.businessRegistration,
          license: user.businessLicense,
          tin: user.tin,
          certificate: user.certificate,
          menuSamples: user.menuSamples ? [user.menuSamples] : [],
          promoVideo: user.video,
          photos: user.photos || [],
        },
        isVerified: false,
      });
      
      try {
        await vendor.save();
      } catch (vendorError) {
        vendor = await Vendor.findOne({ email: user.email });
        if (!vendor) {
          return res.status(500).json({ 
            success: false, 
            message: 'Failed to create vendor profile. Please contact support.' 
          });
        }
      }
    }
    
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    if (menuItem.vendor.toString() !== vendor._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { name, description, price, category, tags, isAvailable } = req.body;

    if (name) menuItem.name = name;
    if (description !== undefined) menuItem.description = description;
    if (price) menuItem.price = parseFloat(price);
    if (category) menuItem.category = category;
    if (tags) menuItem.tags = tags.split(',');
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable !== 'false';
    if (req.file?.cloudinaryUrl) menuItem.imageUrl = req.file.cloudinaryUrl;

    await menuItem.save();
    res.json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete menu item (vendor only)
router.delete('/:id', authenticate, authorize('vendor'), async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ user: req.userId });
    
    // If vendor record doesn't exist, create one from user data
    if (!vendor) {
      const User = require('../models/User');
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Ensure required fields have valid values (not empty strings)
      const vendorCity = (user.city && user.city.trim()) ? user.city.trim() : 'Not Specified';
      const vendorPhone = (user.phone && user.phone.trim()) ? user.phone.trim() : '0000000000';
      const vendorBusinessName = (user.businessName && user.businessName.trim()) ? user.businessName.trim() : 'Business Name';
      const vendorOwnerName = (user.ownerManagerName && user.ownerManagerName.trim()) ? user.ownerManagerName.trim() : (user.fullName || 'Owner');
      
      vendor = new Vendor({
        ownerName: vendorOwnerName,
        businessName: vendorBusinessName,
        email: user.email,
        user: user._id,
        phone: vendorPhone,
        whatsapp: user.whatsapp,
        telegram: user.telegram,
        businessType: user.businessType || 'Others',
        city: vendorCity,
        primaryLocation: {
          address: user.primaryLocation || '',
        },
        documents: {
          businessRegistration: user.businessRegistration,
          license: user.businessLicense,
          tin: user.tin,
          certificate: user.certificate,
          menuSamples: user.menuSamples ? [user.menuSamples] : [],
          promoVideo: user.video,
          photos: user.photos || [],
        },
        isVerified: false,
      });
      
      try {
        await vendor.save();
      } catch (vendorError) {
        vendor = await Vendor.findOne({ email: user.email });
        if (!vendor) {
          return res.status(500).json({ 
            success: false, 
            message: 'Failed to create vendor profile. Please contact support.' 
          });
        }
      }
    }
    
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    if (menuItem.vendor.toString() !== vendor._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await menuItem.deleteOne();
    res.json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
