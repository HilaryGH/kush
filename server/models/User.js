const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: String,
    // Application roles
    // - user: regular customer
    // - admin: standard admin
    // - vendor: restaurant / vendor
    // - superadmin: highest level admin
    // - support: customer support team
    // - marketing: marketing team
    role: {
      type: String,
      enum: ['user', 'admin', 'vendor', 'rider', 'superadmin', 'support', 'marketing'],
      default: 'user',
    },
    location: {
      lat: Number,
      lng: Number,
      address: String,
    },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date,
    language: { type: String, default: 'en' },
    referralCode: { type: String, unique: true },
    totalEarnings: { type: Number, default: 0 },
    // Registration fields (consolidated from Registration model)
    registrationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved', // Default to approved for direct signups
    },
    registrationType: {
      type: String,
      enum: ['service-provider', 'service-seeker', 'direct-signup'],
    },
    serviceProviderType: {
      type: String,
      enum: ['food-vendor', 'lounge-nightclub'],
    },
    serviceSeekerType: {
      type: String,
      enum: ['individual', 'corporate'],
    },
    // Business/Vendor fields
    businessName: String,
    ownerManagerName: String,
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
    // Corporate fields
    companyName: String,
    contactPersonName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
