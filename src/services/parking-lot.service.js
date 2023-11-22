const httpStatus = require('http-status');
const { ParkingLot } = require('../models');
const ApiError = require('../utils/ApiError');

const createParkingLot = async (body) => {
  return ParkingLot.create(body);
};

const queryParkingLot = async (filter, options) => {
  const parkingLots = await ParkingLot.paginate(filter, options);
  return parkingLots;
};

const getParkingLotById = async (id) => {
  return await ParkingLot.findById(id);
};

const updateParkingLotById = async (id, updateBody) => {
  const parkingLot = await getParkingLotById(id);
  if (!parkingLot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parking lot not found');
  }
  Object.assign(parkingLot, updateBody);
  await parkingLot.save();
  return parkingLot;
};

const deleteParkingLotById = async (id, updateBody) => {
  const parkingLot = await getParkingLotById(id);
  if (!parkingLot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parking lot not found');
  }
  await parkingLot.remove();
  return parkingLot;
};

module.exports = {
  deleteParkingLotById,
  createParkingLot,
  queryParkingLot,
  getParkingLotById,
  updateParkingLotById,
};
