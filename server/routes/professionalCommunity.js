const express = require('express');
const router = express.Router();
const ProfessionalCommunity = require('../models/ProfessionalCommunity');
const { upload, uploadToCloudinary } = require('../middleware/upload');

// Submit Professional Community Application
router.post('/submit', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'credentials', maxCount: 1 }
]), uploadToCloudinary('professional-community'), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    const applicationData = {
      ...formData,
      cv: files.cv?.[0]?.cloudinaryUrl,
      credentials: files.credentials?.[0]?.cloudinaryUrl,
    };

    const application = new ProfessionalCommunity(applicationData);
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
