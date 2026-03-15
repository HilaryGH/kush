const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const Order = require('../models/Order');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

// Get all riders (admin)
router.get('/', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const riders = await Driver.find()
      .populate('user', 'fullName email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, riders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get rider profile
router.get('/profile', authenticate, authorize('rider'), async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.userId }).populate('user');
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider profile not found' });
    }
    res.json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get available orders for rider
router.get('/available-orders', authenticate, authorize('rider'), async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.userId });
    if (!driver || !driver.isOnline) {
      return res.json({ success: true, orders: [] });
    }

    const orders = await Order.find({
      status: 'ready_for_pickup',
      driver: { $exists: false },
    })
      .populate('vendor', 'businessName location')
      .populate('user', 'fullName phone')
      .sort({ createdAt: 1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get active deliveries
router.get('/active-deliveries', authenticate, authorize('rider'), async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.userId });
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    const orders = await Order.find({
      driver: driver._id,
      status: { $in: ['assigned_to_driver', 'on_the_way'] },
    })
      .populate('user', 'fullName phone')
      .populate('vendor', 'businessName location')
      .populate('items.menuItem')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Accept delivery
router.post('/accept-delivery/:orderId', authenticate, authorize('rider'), async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.userId });
    if (!driver || !driver.isOnline) {
      return res.status(400).json({ success: false, message: 'Rider must be online' });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.driver) {
      return res.status(400).json({ success: false, message: 'Order already assigned' });
    }

    if (order.status !== 'ready_for_pickup') {
      return res.status(400).json({ success: false, message: 'Order not ready for pickup' });
    }

    order.driver = driver._id;
    order.status = 'assigned_to_driver';
    await order.save();

    // Emit notifications
    const io = req.app.get('io');
    io.to(`user_${order.user}`).emit('rider_assigned', { order });
    io.to(`vendor_${order.vendor}`).emit('rider_assigned', { order });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update online/offline status
router.patch('/status', authenticate, authorize('rider'), async (req, res) => {
  try {
    const { isOnline, isAvailable } = req.body;
    const driver = await Driver.findOne({ user: req.userId });

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    if (isOnline !== undefined) driver.isOnline = isOnline;
    if (isAvailable !== undefined) driver.isAvailable = isAvailable;

    await driver.save();
    res.json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update location
router.post('/location', authenticate, authorize('rider'), async (req, res) => {
  try {
    const { lat, lng, address } = req.body;
    const driver = await Driver.findOne({ user: req.userId });

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    driver.currentLocation = {
      lat,
      lng,
      address,
      lastUpdated: new Date(),
    };

    await driver.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get earnings
router.get('/earnings', authenticate, authorize('rider'), async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.userId });
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    const { startDate, endDate } = req.query;
    let dateQuery = { driver: driver._id, status: 'delivered' };

    if (startDate && endDate) {
      dateQuery.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const orders = await Order.find(dateQuery);
    const periodEarnings = orders.reduce((sum, order) => sum + order.deliveryFee, 0);

    res.json({
      success: true,
      earnings: {
        today: driver.todayEarnings,
        total: driver.totalEarnings,
        period: periodEarnings,
        completedDeliveries: driver.completedDeliveries,
        rating: driver.rating,
        payoutHistory: driver.payoutHistory,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get delivery history
router.get('/history', authenticate, authorize('rider'), async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.userId });
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    const orders = await Order.find({ driver: driver._id })
      .populate('user', 'fullName')
      .populate('vendor', 'businessName')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve rider (admin)
router.patch('/:id/approve', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    // Additional approval logic can be added here
    res.json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
