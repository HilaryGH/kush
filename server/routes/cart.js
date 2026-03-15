const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const { authenticate, authorize } = require('../middleware/auth');

// Get user's cart
router.get('/', authenticate, authorize('user'), async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate('items.menuItem');

    if (!cart) {
      cart = new Cart({ user: req.userId, items: [], totalAmount: 0 });
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add item to cart
router.post('/add', authenticate, authorize('user'), async (req, res) => {
  try {
    const { menuItemId, quantity, notes } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem || !menuItem.isAvailable) {
      return res.status(404).json({ success: false, message: 'Menu item not available' });
    }

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = new Cart({ user: req.userId, items: [], totalAmount: 0 });
    }

    // Check if vendor matches (can't mix vendors in cart)
    if (cart.vendor && cart.vendor.toString() !== menuItem.vendor.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot add items from different restaurants. Clear cart first.',
      });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity || 1;
      if (notes) cart.items[existingItemIndex].notes = notes;
    } else {
      cart.items.push({
        menuItem: menuItemId,
        quantity: quantity || 1,
        notes: notes || '',
      });
    }

    // Set vendor if not set
    if (!cart.vendor) {
      cart.vendor = menuItem.vendor;
    }

    // Calculate total
    cart.totalAmount = 0;
    for (const item of cart.items) {
      const itemData = await MenuItem.findById(item.menuItem);
      cart.totalAmount += itemData.price * item.quantity;
    }

    await cart.save();
    await cart.populate('items.menuItem');

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update cart item quantity
router.patch('/item/:itemId', authenticate, authorize('user'), async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate total
    cart.totalAmount = 0;
    for (const item of cart.items) {
      const itemData = await MenuItem.findById(item.menuItem);
      cart.totalAmount += itemData.price * item.quantity;
    }

    await cart.save();
    await cart.populate('items.menuItem');

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove item from cart
router.delete('/item/:itemId', authenticate, authorize('user'), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);

    // Recalculate total
    cart.totalAmount = 0;
    for (const item of cart.items) {
      const itemData = await MenuItem.findById(item.menuItem);
      cart.totalAmount += itemData.price * item.quantity;
    }

    await cart.save();
    await cart.populate('items.menuItem');

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear cart
router.delete('/clear', authenticate, authorize('user'), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalAmount = 0;
    cart.vendor = null;
    await cart.save();

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
