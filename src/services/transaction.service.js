const httpStatus = require('http-status');
const { Transaction } = require('../models');
const ApiError = require('../utils/ApiError');

const createTransaction = async (body) => {
  return await Transaction.create(body);
};

const fetchAllTransaction = async (filter, options) => {
  return await Transaction.paginate(filter, options);
};

const fetchTransactionDetails = async (transactionId) => {
  return await Transaction.findById(transactionId);
};

module.exports = {
  createTransaction,
  fetchAllTransaction,
  fetchTransactionDetails,
};
