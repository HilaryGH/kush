const express = require('express');
const router = express.Router();
const PremiumCommunity = require('../models/PremiumCommunity');

// Submit Premium Community Application
router.post('/submit', async (req, res) => {
  try {
    const formData = req.body;

    const application = new PremiumCommunity(formData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Premium request submitted successfully. Our concierge will contact you soon.',
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
