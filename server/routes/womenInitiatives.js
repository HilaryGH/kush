const express = require('express');
const router = express.Router();
const WomenInitiatives = require('../models/WomenInitiatives');
const upload = require('../middleware/upload');

// Submit Women Initiatives Application
router.post('/submit', upload.fields([
  { name: 'idDocument', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'certificates', maxCount: 1 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    const applicationData = {
      ...formData,
      age: parseInt(formData.age),
      idDocument: files.idDocument?.[0]?.filename,
      profilePhoto: files.profilePhoto?.[0]?.filename,
      certificates: files.certificates?.[0]?.filename,
    };

    const application = new WomenInitiatives(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
