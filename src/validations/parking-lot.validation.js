const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createParkingLot = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    category: Joi.string().required().valid('car', 'truck', 'bike'),
    long: Joi.string().required(),
    lat: Joi.string().required(),
    amountPerHr: Joi.number().required(),
  }),
};

const getParkingLotById = {
  params: Joi.object().keys({
    parkingLotId: Joi.string().required().custom(objectId),
  }),
};

const updateParkingLot = {
  params: Joi.object().keys({
    parkingLotId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    category: Joi.string().valid('car', 'truck', 'bike', 'any'),
    name: Joi.string(),
    location: Joi.string(),
    long: Joi.string(),
    lat: Joi.string(),
    amountPerHr: Joi.number(),
  }),
};

const getAllParkingLot = {
  query: Joi.object().keys({
    isBooked: Joi.string(),
    amountPerHr: Joi.string(),
    category: Joi.string().valid('car', 'truck', 'bike'),
  }),
};

const deleteParkingLot = {
  params: Joi.object().keys({
    parkingLotId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createParkingLot,
  deleteParkingLot,
  getParkingLotById,
  getAllParkingLot,
  updateParkingLot,
};
