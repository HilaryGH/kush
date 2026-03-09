const express = require('express');
const router = express.Router();
const DiasporaCommunity = require('../models/DiasporaCommunity');
const upload = require('../middleware/upload');

// Submit Diaspora Community Application
router.post('/submit', upload.single('passport'), async (req, res) => {
  try {
    const formData = req.body;
    const file = req.file;

    const applicationData = {
      ...formData,
      passport: file?.filename,
    };

    const application = new DiasporaCommunity(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. You will be redirected to payment.',
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
