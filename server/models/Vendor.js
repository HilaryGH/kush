const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    phone: { type: String, required: true },
    whatsapp: { type: String },
    telegram: { type: String },
    businessType: {
      type: String,
      enum: [
        'Restaurant Tier 1',
        'Restaurant Tier 2',
        'Restaurant Tier 3',
        'Restaurant Tier 4',
        'Elite Restaurant',
        'Catering Service',
        'Lounge',
        'Night Club',
        'Others',
      ],
      required: true,
    },
    city: { type: String, required: true },
    primaryLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    restaurantPhoto: { type: String }, // Main photo displayed on restaurants page
    documents: {
      businessRegistration: String,
      license: String,
      tin: String,
      certificate: String,
      menuSamples: [String],
      promoVideo: String,
      photos: [String],
      videos: [String],
    },
    diningAreaLayout: String,
    weeklyMenu: String,
    discounts: [
      {
        code: String,
        description: String,
        discountType: { type: String, enum: ['percentage', 'fixed'] },
        discountValue: Number,
        validFrom: Date,
        validUntil: Date,
        isActive: { type: Boolean, default: true },
      },
    ],
    totalEarnings: { type: Number, default: 0 },
    monthlyEarnings: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true },
    openTime: { type: String },
    closeTime: { type: String },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    // Basic account info for revenue/settlement
    payoutAccount: {
      bankName: String,
      accountName: String,
      accountNumber: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', VendorSchema);

