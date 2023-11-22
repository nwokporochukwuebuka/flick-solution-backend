const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getAllTransactions = {
  query: Joi.object().keys({
    completed: Joi.string(),
    amount: Joi.string(),
    duration: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const fetchAllUsersTransactions = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    completed: Joi.string(),
    amount: Joi.string(),
    duration: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransactionDetails = {};

module.exports = {
  getAllTransactions,
  fetchAllUsersTransactions,
  getTransactionDetails,
};
