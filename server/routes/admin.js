const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Driver = require('../models/Driver');
const Order = require('../models/Order');
const ServicePricing = require('../models/ServicePricing');
const PromoCode = require('../models/PromoCode');
const { authenticate, authorize } = require('../middleware/auth');

// Dashboard analytics
router.get('/dashboard', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const activeRiders = await Driver.countDocuments({ isOnline: true });
    const totalRestaurants = await Vendor.countDocuments({ isVerified: true });
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Revenue summary
    const orders = await Order.find({ status: 'delivered' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const todayRevenue = orders
      .filter((order) => {
        const today = new Date();
        return order.createdAt.toDateString() === today.toDateString();
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'fullName')
      .populate('vendor', 'businessName')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      analytics: {
        totalOrders,
        activeRiders,
        totalRestaurants,
        totalUsers,
        totalRevenue,
        todayRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get orders heatmap data
router.get('/orders-heatmap', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'cancelled' } })
      .populate('vendor', 'location')
      .populate('user', 'location');

    const heatmapData = orders.map((order) => ({
      lat: order.deliveryAddress?.location?.lat || order.user?.location?.lat,
      lng: order.deliveryAddress?.location?.lng || order.user?.location?.lng,
      weight: 1,
    }));

    res.json({ success: true, heatmapData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// User management - Get all users
router.get('/users', authenticate, authorize('admin', 'superadmin', 'support', 'marketing'), async (req, res) => {
  try {
    const { role, status, search } = req.query;
    let query = {};
    
    // Filter by role if provided
    if (role) {
      query.role = role;
    }
    
    // Filter by registration status if provided
    if (status) {
      query.registrationStatus = status;
    }
    
    // Search by name or email if provided
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    console.log('Fetching users with query:', JSON.stringify(query));
    const users = await User.find(query)
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 });
    
    console.log(`Found ${users.length} users`);
    
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get pending registrations
router.get('/registrations/pending', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const users = await User.find({ 
      registrationStatus: 'pending',
      registrationType: { $ne: 'direct-signup' }
    }).sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve/Reject user registration
router.patch('/users/:id/registration-status', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const { registrationStatus } = req.body;
    
    if (!['approved', 'rejected'].includes(registrationStatus)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be "approved" or "rejected"' 
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { registrationStatus },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ 
      success: true, 
      message: `User registration ${registrationStatus} successfully`,
      user 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/users/:id/status', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // You can add isActive field to User model if needed
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Vendor management
router.get('/vendors', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rider management
router.get('/riders', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const riders = await Driver.find()
      .populate('user', 'fullName email phone')
      .sort({ createdAt: -1 });
    res.json({ success: true, riders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Service pricing management
router.get('/pricing', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    let pricing = await ServicePricing.findOne().sort({ createdAt: -1 });
    if (!pricing) {
      pricing = new ServicePricing({
        baseFare: 0,
        perKm: 0,
        perMinute: 0,
      });
      await pricing.save();
    }
    res.json({ success: true, pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/pricing', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    let pricing = await ServicePricing.findOne().sort({ createdAt: -1 });
    if (!pricing) {
      pricing = new ServicePricing({});
    }

    const { baseFare, perKm, perMinute, minOrderAmount, surgeMultiplier, surgeEnabled } = req.body;

    if (baseFare !== undefined) pricing.baseFare = baseFare;
    if (perKm !== undefined) pricing.perKm = perKm;
    if (perMinute !== undefined) pricing.perMinute = perMinute;
    if (minOrderAmount !== undefined) pricing.minOrderAmount = minOrderAmount;
    if (surgeMultiplier !== undefined) pricing.surgeMultiplier = surgeMultiplier;
    if (surgeEnabled !== undefined) pricing.surgeEnabled = surgeEnabled;

    pricing.updatedBy = req.userId;
    await pricing.save();

    res.json({ success: true, pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Promo code management
router.get('/promo-codes', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
    res.json({ success: true, promoCodes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/promo-codes', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const promoCode = new PromoCode(req.body);
    await promoCode.save();
    res.status(201).json({ success: true, promoCode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/promo-codes/:id', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promoCode) {
      return res.status(404).json({ success: false, message: 'Promo code not found' });
    }
    res.json({ success: true, promoCode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/promo-codes/:id', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Promo code deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders (admin view)
router.get('/orders', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'fullName email')
      .populate('vendor', 'businessName')
      .populate('driver', 'user')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
