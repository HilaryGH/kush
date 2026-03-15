const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

// Generate referral code
router.post('/generate', authenticate, authorize('user'), async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // Generate unique code
    let code;
    let exists = true;
    while (exists) {
      code = `REF${user._id.toString().slice(-6).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
      const existing = await Referral.findOne({ code });
      if (!existing) exists = false;
    }

    // Update user's referral code
    user.referralCode = code;
    await user.save();

    // Create referral record
    const referral = new Referral({
      referrer: req.userId,
      code,
      status: 'pending',
    });

    await referral.save();

    res.json({ success: true, referralCode: code });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's referral info
router.get('/my-referrals', authenticate, authorize('user'), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const referrals = await Referral.find({ referrer: req.userId })
      .populate('referred', 'fullName email')
      .sort({ createdAt: -1 });

    const totalEarnings = referrals
      .filter((r) => r.status === 'completed')
      .reduce((sum, r) => sum + r.rewardAmount, 0);

    res.json({
      success: true,
      referralCode: user.referralCode,
      referrals,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Use referral code (during signup)
router.post('/use', async (req, res) => {
  try {
    const { code, userId } = req.body;

    const referral = await Referral.findOne({ code, status: 'pending' });
    if (!referral) {
      return res.status(404).json({ success: false, message: 'Invalid referral code' });
    }

    if (referral.referrer.toString() === userId) {
      return res.status(400).json({ success: false, message: 'Cannot use your own code' });
    }

    referral.referred = userId;
    referral.status = 'completed';
    referral.rewardAmount = 100; // Default reward amount
    await referral.save();

    // Update referrer's earnings
    const referrer = await User.findById(referral.referrer);
    referrer.totalEarnings += referral.rewardAmount;
    await referrer.save();

    res.json({ success: true, message: 'Referral code applied successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
