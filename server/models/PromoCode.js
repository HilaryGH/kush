const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    description: String,
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscount: Number,
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    usageLimit: { type: Number, default: null },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    applicableTo: {
      type: String,
      enum: ['all', 'vendor', 'category'],
      default: 'all',
    },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PromoCode', PromoCodeSchema);
