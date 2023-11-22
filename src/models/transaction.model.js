const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const transactionSchema = mongoose.Schema(
  {
    parkingLotId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ParkingLot',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    reservationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Reservation',
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
