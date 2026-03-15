const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    type: {
      type: String,
      enum: ['order_update', 'promo', 'system', 'payout', 'admin'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: Object,
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);

