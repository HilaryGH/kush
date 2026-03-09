const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  registrationType: {
    type: String,
    enum: ['service-provider', 'service-seeker'],
    required: true
  },
  serviceProviderType: {
    type: String,
    enum: ['food-vendor', 'lounge-nightclub'],
  },
  serviceSeekerType: {
    type: String,
    enum: ['individual', 'corporate'],
  },
  // Food Vendor / Lounge fields
  businessName: String,
  ownerManagerName: String,
  phone: String,
  email: String,
  whatsapp: String,
  telegram: String,
  businessType: String,
  city: String,
  primaryLocation: String,
  // Attachments
  businessRegistration: String,
  businessLicense: String,
  tin: String,
  certificate: String,
  menuSamples: String,
  video: String,
  photos: [String],
  // Individual Service Seeker
  fullName: String,
  address: String,
  // Corporate Service Seeker
  companyName: String,
  contactPersonName: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema);
