const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const reservationValidation = require('../../validations/reservation.validation');
const reservationController = require('../../controllers/reservation.controllers');

const router = express.Router();

router.post(
  '/book/:parkingLotId',
  auth('user'),
  validate(reservationValidation.createReservation),
  reservationController.createReservation
);

router.get(
  '/',
  auth('parkingLotManager'),
  validate(reservationValidation.getAllReservations),
  reservationController.fetchAllReservations
);

router.get(
  '/user',
  auth('user'),
  validate(reservationValidation.getAllReservations),
  reservationController.fetchUsersReservations
);

router.get(
  '/:reservationId',
  auth(),
  validate(reservationValidation.fetchReservationDetails),
  reservationController.fetchReservation
);

router.patch(
  '/pay/:reservationId',
  auth('user'),
  validate(reservationValidation.payForReservation),
  reservationController.payForReservation
);

router.post(
  '/confirmation',
  auth('parkingLotManager'),
  validate(reservationValidation.confirmReservationStatus),
  reservationController.confirmReservation
);

module.exports = router;
