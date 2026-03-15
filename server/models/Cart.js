const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, default: 1 },
        notes: String,
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
