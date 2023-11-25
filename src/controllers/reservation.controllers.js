const httpStatus = require('http-status');
const qrcode = require('qrcode');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { reservationService, userService, parkingLotService, transactionService } = require('../services');
const ApiError = require('../utils/ApiError');

// tested
const createReservation = catchAsync(async (req, res) => {
  const startTime = new Date().toISOString();
  const reservation = await reservationService.create(req.user.id, req.params.parkingLotId, startTime);
  const parkingLot = await parkingLotService.updateParkingLotById(req.params.parkingLotId, { isBooked: true });
  return res.status(httpStatus.OK).send({ reservation, parkingLot });
});

const payForReservation = catchAsync(async (req, res) => {
  const endTime = new Date().toISOString();
  const reservation = await reservationService.getReservation(req.params.reservationId);
  const parkingLot = await parkingLotService.getParkingLotById(reservation.parkingLotId);
  const user = await userService.getUserById(reservation.user);

  const start = new Date(reservation.startTime);
  const end = new Date(endTime);

  const duration = Math.ceil(Math.abs((end - start) / (1000 * 3600)));

  const amount = parkingLot.amountPerHr * duration;

  await parkingLotService.updateParkingLotById(parkingLot.id, { isBooked: false });

  const generateQrCodeData = JSON.stringify({
    userInfo: { username: user.name, userId: user.id },
    parkingInfo: {
      parkingLotId: parkingLot.id,
      amountPerHour: parkingLot.amountPerHour,
      parkingLotName: parkingLot.name,
      parkingLotAddress: parkingLot.location,
    },
    reservationInfo: {
      startTime: reservation.startTime,
      endTime,
      duration,
      amount,
      reservationId: reservation.id,
      completed: true,
      isPaid: true,
    },
  });
  const generatedQrCode = await qrcode.toDataURL(generateQrCodeData);
  const updatedReservation = await reservationService.updateReservation(
    req.params.reservationId,
    req.user.id,
    parkingLot.id,
    {
      endTime,
      completed: true,
      duration,
      amount,
      isPaid: true,
      qrcode: generatedQrCode,
    }
  );
  const transaction = await transactionService.createTransaction({
    parkingLotId: parkingLot.id,
    user: user.id,
    reservationId: reservation.id,
    completed: true,
    duration,
    amount,
  });
  return res.status(200).send({ transaction, updatedReservation, parkingLot });
});

const confirmReservation = catchAsync(async (req, res) => {
  const { reservationId } = req.body;
  const reservation = await reservationService.getReservation(reservationId);
  if (!reservation) throw new ApiError(httpStatus.NOT_FOUND, 'This is reservation is not found');
  const user = await userService.getUserById(req.user.id);
  const parkingLot = await parkingLotService.getParkingLotById(reservation.parkingLotId);
  return res.status(200).send({ reservation, user, parkingLot });
});

const fetchUsersReservations = catchAsync(async (req, res) => {
  const reservations = await reservationService.fetchUserReservation(req.user.id);
  if (!reservations) throw new ApiError(httpStatus.NOT_FOUND, 'This reservation does not exist');
  return res.status(200).send(reservations);
});

// tested
const fetchReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.getReservation(req.params.reservationId);
  if (!reservation) throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  return res.send(reservation);
});

// tested
const fetchAllReservations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['completed', 'isPaid', 'amount', 'duration']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const reservations = await reservationService.findAllReservation(filter, options);
  return res.status(200).send(reservations);
});

module.exports = {
  createReservation,
  payForReservation,
  confirmReservation,
  fetchAllReservations,
  fetchReservation,
  fetchUsersReservations,
};
