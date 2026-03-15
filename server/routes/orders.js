const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const Vendor = require('../models/Vendor');
const Driver = require('../models/Driver');
const { authenticate, authorize } = require('../middleware/auth');

// Get all orders (with role-based filtering)
router.get('/', authenticate, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'user') {
      query.user = req.userId;
    } else if (req.user.role === 'vendor') {
      const vendor = await Vendor.findOne({ email: req.user.email });
      if (vendor) query.vendor = vendor._id;
    } else if (req.user.role === 'rider') {
      const driver = await Driver.findOne({ user: req.userId });
      if (driver) query.driver = driver._id;
    }

    const orders = await Order.find(query)
      .populate('user', 'fullName email phone')
      .populate('vendor', 'businessName')
      .populate('driver', 'user')
      .populate('items.menuItem')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single order
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'fullName email phone')
      .populate('vendor', 'businessName location')
      .populate('driver', 'user')
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check access
    if (req.user.role === 'user' && order.user._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create order from cart
router.post('/', authenticate, authorize('user'), async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod, promoCode, notes } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.userId }).populate('items.menuItem');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate totals
    let totalAmount = 0;
    for (const item of cart.items) {
      totalAmount += item.menuItem.price * item.quantity;
    }

    // Apply promo code if provided
    let discountAmount = 0;
    if (promoCode) {
      const PromoCode = require('../models/PromoCode');
      const promo = await PromoCode.findOne({ code: promoCode.toUpperCase(), isActive: true });
      if (promo && new Date() >= promo.validFrom && new Date() <= promo.validUntil) {
        if (promo.discountType === 'percentage') {
          discountAmount = (totalAmount * promo.discountValue) / 100;
          if (promo.maxDiscount) discountAmount = Math.min(discountAmount, promo.maxDiscount);
        } else {
          discountAmount = promo.discountValue;
        }
        totalAmount -= discountAmount;
      }
    }

    // Calculate delivery fee (simplified - should use ServicePricing model)
    const deliveryFee = 50; // Base fee
    totalAmount += deliveryFee;

    // Create order
    const order = new Order({
      user: req.userId,
      vendor: cart.vendor,
      items: cart.items,
      totalAmount,
      deliveryFee,
      discountAmount,
      paymentMethod: paymentMethod || 'COD',
      deliveryAddress,
      promoCode: promoCode ? (await require('../models/PromoCode').findOne({ code: promoCode.toUpperCase() }))?._id : null,
      notes,
      status: 'pending',
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    // Emit notification to vendor
    const io = req.app.get('io');
    const vendor = await Vendor.findById(cart.vendor);
    if (vendor) {
      io.to(`vendor_${vendor._id}`).emit('new_order', { order });
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status (vendor/rider/admin)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Role-based status updates
    if (req.user.role === 'vendor') {
      const allowedStatuses = ['accepted', 'preparing', 'ready_for_pickup', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(403).json({ success: false, message: 'Invalid status for vendor' });
      }
    } else if (req.user.role === 'rider') {
      const allowedStatuses = ['on_the_way', 'delivered', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(403).json({ success: false, message: 'Invalid status for rider' });
      }
      if (status === 'delivered') {
        order.actualDeliveryTime = new Date();
      }
    }

    order.status = status;
    await order.save();

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`user_${order.user}`).emit('order_status_update', { orderId: order._id, status });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Assign rider to order (admin)
router.patch('/:id/assign-rider', authenticate, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const { riderId } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const driver = await Driver.findById(riderId);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Rider not found' });
    }

    order.driver = riderId;
    order.status = 'assigned_to_driver';
    await order.save();

    // Emit notification to rider
    const io = req.app.get('io');
    io.to(`rider_${riderId}`).emit('order_assigned', { order });
    io.to(`user_${order.user}`).emit('rider_assigned', { order });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update rider location (for tracking)
router.post('/:id/rider-location', authenticate, authorize('rider'), async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const driver = await Driver.findOne({ user: req.userId });
    if (order.driver.toString() !== driver._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not assigned to this order' });
    }

    order.riderLocation = { lat, lng, lastUpdated: new Date() };
    await order.save();

    // Update driver location
    driver.currentLocation = { lat, lng, lastUpdated: new Date() };
    await driver.save();

    // Emit location update to user
    const io = req.app.get('io');
    io.to(`user_${order.user}`).emit('rider_location_update', { orderId: order._id, lat, lng });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rate order (user)
router.post('/:id/rate', authenticate, authorize('user'), async (req, res) => {
  try {
    const { vendorRating, vendorFeedback, riderRating, riderFeedback } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (order.status !== 'delivered') {
      return res.status(400).json({ success: false, message: 'Order not delivered yet' });
    }

    order.customerRating = {
      rating: vendorRating,
      feedback: vendorFeedback,
      driverRating: riderRating,
      driverFeedback: riderFeedback,
    };

    await order.save();

    // Update vendor rating
    if (vendorRating) {
      const vendor = await Vendor.findById(order.vendor);
      const totalRating = vendor.rating * vendor.ratingCount + vendorRating;
      vendor.ratingCount += 1;
      vendor.rating = totalRating / vendor.ratingCount;
      await vendor.save();
    }

    // Update rider rating
    if (riderRating && order.driver) {
      const driver = await Driver.findById(order.driver);
      const totalRating = driver.rating * driver.ratingCount + riderRating;
      driver.ratingCount += 1;
      driver.rating = totalRating / driver.ratingCount;
      await driver.save();
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
