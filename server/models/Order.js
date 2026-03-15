const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, default: 1 },
        notes: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'CARD'], default: 'COD' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'authorized', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: [
        'pending', // placed by user
        'accepted', // accepted by vendor
        'preparing',
        'ready_for_pickup',
        'assigned_to_driver',
        'on_the_way',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
    deliveryAddress: {
      label: String,
      street: String,
      city: String,
      location: {
        lat: Number,
        lng: Number,
      },
    },
    pickupAddress: {
      label: String,
      street: String,
      city: String,
      location: {
        lat: Number,
        lng: Number,
      },
    },
    promoCode: { type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode' },
    discountAmount: { type: Number, default: 0 },
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    riderLocation: {
      lat: Number,
      lng: Number,
      lastUpdated: Date,
    },
    deliveryFee: { type: Number, default: 0 },
    notes: String,
    customerRating: {
      rating: Number,
      feedback: String,
      driverRating: Number,
      driverFeedback: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

