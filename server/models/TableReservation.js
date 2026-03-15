const mongoose = require('mongoose');

const TableReservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    reservationTime: { type: Date, required: true },
    partySize: { type: Number, required: true },
    notes: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TableReservation', TableReservationSchema);

