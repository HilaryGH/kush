const express = require('express');
const router = express.Router();
const PromoCode = require('../models/PromoCode');
const { authenticate } = require('../middleware/auth');

// Validate promo code (public)
router.post('/validate', authenticate, async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const promoCode = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promoCode) {
      return res.status(404).json({ success: false, message: 'Invalid promo code' });
    }

    // Check validity dates
    const now = new Date();
    if (now < promoCode.validFrom || now > promoCode.validUntil) {
      return res.status(400).json({ success: false, message: 'Promo code expired' });
    }

    // Check usage limit
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
      return res.status(400).json({ success: false, message: 'Promo code usage limit reached' });
    }

    // Check minimum order amount
    if (orderAmount < promoCode.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ${promoCode.minOrderAmount}`,
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (promoCode.discountType === 'percentage') {
      discountAmount = (orderAmount * promoCode.discountValue) / 100;
      if (promoCode.maxDiscount) {
        discountAmount = Math.min(discountAmount, promoCode.maxDiscount);
      }
    } else {
      discountAmount = promoCode.discountValue;
    }

    res.json({
      success: true,
      promoCode: {
        code: promoCode.code,
        discountAmount,
        description: promoCode.description,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
