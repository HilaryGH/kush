const mongoose = require('mongoose');

const ServicePricingSchema = new mongoose.Schema(
  {
    baseFare: { type: Number, required: true, default: 0 },
    perKm: { type: Number, required: true, default: 0 },
    perMinute: { type: Number, required: true, default: 0 },
    minOrderAmount: { type: Number, default: 0 },
    surgeMultiplier: { type: Number, default: 1 },
    surgeEnabled: { type: Boolean, default: false },
    surgeConditions: {
      minOrders: Number,
      timeRange: {
        start: String,
        end: String,
      },
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServicePricing', ServicePricingSchema);
