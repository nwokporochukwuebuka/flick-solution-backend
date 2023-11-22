const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { transactionService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const fetchAllTransaction = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['completed', 'duration', 'amount']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const transactions = await transactionService.fetchAllTransaction(filter, options);
  return res.send(transactions);
});

const fetchAllUsersTransactions = catchAsync(async (req, res) => {});

const fetchTransactionDetails = catchAsync(async (req, res) => {});

module.exports = {
  fetchAllTransaction,
  fetchAllUsersTransactions,
  fetchTransactionDetails,
};
