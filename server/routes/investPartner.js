const express = require('express');
const router = express.Router();
const InvestPartner = require('../models/InvestPartner');
const upload = require('../middleware/upload');

// Submit Invest/Partner Application
router.post('/submit', upload.fields([
  { name: 'idDocument', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'tradeRegistration', maxCount: 1 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    const applicationData = {
      ...formData,
      idDocument: files.idDocument?.[0]?.filename,
      license: files.license?.[0]?.filename,
      tradeRegistration: files.tradeRegistration?.[0]?.filename,
    };

    const application = new InvestPartner(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Partnership request submitted successfully. We will contact you soon.',
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
