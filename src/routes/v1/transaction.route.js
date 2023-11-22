const express = require('express');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get(
  '/',
  auth('parkingLotManager'),
  validate(transactionValidation.getAllTransactions),
  transactionController.fetchAllTransaction
);

router.get(
  '/user/:userId',
  auth(),
  validate(transactionValidation.fetchAllUsersTransactions),
  transactionController.fetchAllUsersTransactions
);

router.get(
  '/:transactionId',
  auth(),
  validate(transactionValidation.fetchAllUsersTransactions),
  transactionController.fetchAllUsersTransactions
);

module.exports = router;
