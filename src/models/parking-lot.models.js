const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const parkingLotSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['car', 'truck', 'bike', 'any'],
      default: 'any',
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    long: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    amountPerHr: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    imgPublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
parkingLotSchema.plugin(toJSON);
parkingLotSchema.plugin(paginate);

/**
 * @typedef ParkingLot
 */
const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = ParkingLot;
