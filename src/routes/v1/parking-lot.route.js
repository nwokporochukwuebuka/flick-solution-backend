const express = require('express');
const validate = require('../../middlewares/validate');
const parkingLotController = require('../../controllers/parking-lot.controller');
const parkingLotValidation = require('../../validations/parking-lot.validation');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/multer');

const router = express.Router();

// tested
router.post(
  '/',
  auth('parkingLotManager'),
  upload.single('image'),
  validate(parkingLotValidation.createParkingLot),
  parkingLotController.createParkingLot
);

// tested
router.patch('/:parkingLotId', auth('parkingLotManager'), parkingLotController.updateParkingLot);

// tested
router.get('/', auth(), validate(parkingLotValidation.getAllParkingLot), parkingLotController.getAllParkingLot);

// tested
router.get(
  '/:parkingLotId',
  auth(),
  validate(parkingLotValidation.getParkingLotById),
  parkingLotController.getParkingLotDetails
);

router.delete(
  '/',
  auth('parkingLotManager'),
  validate(parkingLotValidation.getParkingLotById),
  parkingLotController.deleteParkingLot
);

module.exports = router;
