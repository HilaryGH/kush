const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { authenticate, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/vendors'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all vendors (public)
router.get('/', async (req, res) => {
  try {
    const { verified, open } = req.query;
    let query = {};
    
    // Filter by verification status if provided
    if (verified === 'true') {
      query.isVerified = true;
    } else if (verified === 'false') {
      query.isVerified = false;
    }
    // If not specified, show all (both verified and unverified)
    
    // Filter by open status if provided
    if (open === 'true') {
      query.isOpen = true;
    } else if (open === 'false') {
      query.isOpen = false;
    }
    // If not specified, show all (both open and closed)
    
    const vendors = await Vendor.find(query)
      .select('-documents')
      .populate('user', 'email fullName')
      .sort({ rating: -1, createdAt: -1 });

    console.log(`Found ${vendors.length} vendors with query:`, query);
    res.json({ success: true, vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single vendor
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get vendor's orders
router.get('/:id/orders', authenticate, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    // Check access
    if (req.user.role === 'vendor') {
      const vendorUser = await Vendor.findOne({ email: req.user.email });
      if (vendorUser._id.toString() !== req.params.id) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    }

    const orders = await Order.find({ vendor: req.params.id })
      .populate('user', 'fullName email phone')
      .populate('driver', 'user')
      .populate('items.menuItem')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get vendor's menu
router.get('/:id/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ vendor: req.params.id, isAvailable: true })
      .sort({ category: 1, name: 1 });

    res.json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update vendor status (open/close)
router.patch('/:id/status', authenticate, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const { isOpen, openTime, closeTime } = req.body;
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    if (req.user.role === 'vendor') {
      const vendorUser = await Vendor.findOne({ email: req.user.email });
      if (vendorUser._id.toString() !== req.params.id) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    }

    if (isOpen !== undefined) vendor.isOpen = isOpen;
    if (openTime) vendor.openTime = openTime;
    if (closeTime) vendor.closeTime = closeTime;

    await vendor.save();
    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get vendor earnings/reports
router.get('/:id/reports', authenticate, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    if (req.user.role === 'vendor') {
      const vendorUser = await Vendor.findOne({ email: req.user.email });
      if (vendorUser._id.toString() !== req.params.id) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    }

    const { startDate, endDate } = req.query;
    let dateQuery = { vendor: req.params.id, status: 'delivered' };

    if (startDate && endDate) {
      dateQuery.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const orders = await Order.find(dateQuery);
    const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;

    res.json({
      success: true,
      reports: {
        totalEarnings,
        totalOrders,
        monthlyEarnings: vendor.monthlyEarnings,
        rating: vendor.rating,
        ratingCount: vendor.ratingCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add discount/promotion (vendor)
router.post('/:id/discounts', authenticate, authorize('vendor'), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ email: req.user.email });
    if (vendor._id.toString() !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { code, description, discountType, discountValue, validFrom, validUntil } = req.body;

    vendor.discounts.push({
      code,
      description,
      discountType,
      discountValue,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      isActive: true,
    });

    await vendor.save();
    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve vendor (admin)
router.patch('/:id/approve', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    vendor.isVerified = true;
    await vendor.save();

    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
