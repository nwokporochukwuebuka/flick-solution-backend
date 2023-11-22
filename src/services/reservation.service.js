const httpStatus = require('http-status');
const { Reservation, User, ParkingLot } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (userId, parkingLotId, startTime) => {
  const user = await User.findById(userId);
  const parkingLot = await ParkingLot.findById(parkingLotId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  if (!parkingLot) throw new ApiError(httpStatus.NOT_FOUND, 'This Parking lot does not exist');
  return await Reservation.create({ parkingLotId, user: userId, startTime, amount: parkingLot.amount });
};

const updateReservation = async (reservationId, userId, parkingLotId, updateBody) => {
  const user = await User.findById(userId);
  const parkingLot = await ParkingLot.findById(parkingLotId);
  // const reservation = await Reservation.find({ user: user.id, parkingLotId: parkingLot.id, id: reservationId });
  const reservation = await getReservation(reservationId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  if (!parkingLot) throw new ApiError(httpStatus.NOT_FOUND, 'This Parking lot does not exist');
  if (!reservation) throw new ApiError(httpStatus.NOT_FOUND, 'Reservation does not exist');
  Object.assign(reservation, updateBody);
  await reservation.save();
  return reservation;
};

const findAllReservation = async (filter, options) => {
  return await Reservation.paginate(filter, options);
};

const fetchUserReservation = async (userId) => {
  return await Reservation.find({ user: userId });
};

const getReservation = async (id) => {
  return await Reservation.findById(id);
};

module.exports = {
  create,
  updateReservation,
  findAllReservation,
  getReservation,
  fetchUserReservation,
};
