const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const upload = require('../middleware/upload');

// Submit Registration
router.post('/submit', upload.fields([
  { name: 'businessRegistration', maxCount: 1 },
  { name: 'businessLicense', maxCount: 1 },
  { name: 'tin', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'menuSamples', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'photos', maxCount: 10 },
  { name: 'businessRegistrationCorporate', maxCount: 1 },
  { name: 'businessLicenseCorporate', maxCount: 1 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    // Map file paths
    const registrationData = {
      ...formData,
      businessRegistration: files.businessRegistration?.[0]?.filename,
      businessLicense: files.businessLicense?.[0]?.filename,
      tin: files.tin?.[0]?.filename,
      certificate: files.certificate?.[0]?.filename,
      menuSamples: files.menuSamples?.[0]?.filename,
      video: files.video?.[0]?.filename,
      photos: files.photos?.map(file => file.filename),
      businessRegistrationCorporate: files.businessRegistrationCorporate?.[0]?.filename,
      businessLicenseCorporate: files.businessLicenseCorporate?.[0]?.filename,
    };

    const registration = new Registration(registrationData);
    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
