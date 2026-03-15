const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    provider: { type: String, enum: ['stripe', 'paypal', 'mock'], default: 'mock' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'authorized', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
    },
    providerPaymentId: String,
    rawResponse: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);

