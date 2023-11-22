const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReservation = {
  params: Joi.object().keys({
    parkingLotId: Joi.string().required().custom(objectId),
  }),
};
const fetchReservationDetails = {
  params: Joi.object().keys({
    reservationId: Joi.string().required().custom(objectId),
  }),
};
const confirmReservationStatus = {
  body: Joi.object().keys({
    reservationId: Joi.string().required().custom(objectId),
  }),
};

const payForReservation = {
  params: Joi.object().keys({
    reservationId: Joi.string().required().custom(objectId),
  }),
};

const getAllReservations = {
  query: Joi.object().keys({
    completed: Joi.string(),
    isPaid: Joi.string(),
    amount: Joi.string(),
    duration: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createReservation,
  getAllReservations,
  fetchReservationDetails,
  payForReservation,
  confirmReservationStatus,
};
