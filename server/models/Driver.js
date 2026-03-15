const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleType: { type: String },
    vehiclePlate: { type: String },
    licenseNumber: String,
    isOnline: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    currentLocation: {
      lat: Number,
      lng: Number,
      address: String,
      lastUpdated: Date,
    },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    todayEarnings: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    completedDeliveries: { type: Number, default: 0 },
    cancelledDeliveries: { type: Number, default: 0 },
    payoutHistory: [
      {
        amount: Number,
        date: Date,
        status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
        description: String,
      },
    ],
    notificationTone: { type: String, default: 'default' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', DriverSchema);

