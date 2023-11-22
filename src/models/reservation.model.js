const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const reservationSchema = mongoose.Schema(
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
    completed: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      // required: true,
    },
    duration: {
      type: Number,
      // required: false,
    },
    qrcode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reservationSchema.plugin(toJSON);
reservationSchema.plugin(paginate);

/**
 * @typedef Reservation
 */
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
