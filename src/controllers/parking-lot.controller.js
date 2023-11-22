const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { parkingLotService } = require('../services');
const upload = require('../middlewares/multer');
const cloudinary = require('../utils/cloudinary');

const createParkingLot = catchAsync(async (req, res) => {
  const img = await cloudinary.uploader.upload(req.file.path);
  const { name, location, category, long, lat, amountPerHr, duration } = req.body;
  const parkingLot = await parkingLotService.createParkingLot({
    imgUrl: img.secure_url,
    imgPublicId: img.public_id,
    name,
    location,
    category,
    long,
    lat,
    amountPerHr,
    duration,
  });
  return res.status(httpStatus.OK).send({ parkingLot });
});

const getAllParkingLot = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['isBooked', 'category', 'amountPerHr']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const parkingLots = await parkingLotService.queryParkingLot(filter, options);
  return res.status(200).send(parkingLots);
});

const getParkingLotDetails = catchAsync(async (req, res) => {
  const parkingLot = await parkingLotService.getParkingLotById(req.params.parkingLotId);
  if (!parkingLot) throw new ApiError(httpStatus.NOT_FOUND, 'Parking lot not found');
  res.send(parkingLot);
});

const deleteParkingLot = catchAsync(async (req, res) => {
  const parkingLot = await parkingLotService.getParkingLotById(req.params.parkingLotId);
  await cloudinary.uploader.destroy(user.imgPublicId);
  await parkingLot.remove();
  return res.status(204).send();
});

const updateParkingLot = catchAsync(async (req, res) => {
  const parkingLot = await parkingLotService.updateParkingLotById(req.params.parkingLotId, req.body);
  res.send(parkingLot);
});

module.exports = {
  createParkingLot,
  deleteParkingLot,
  getParkingLotDetails,
  getAllParkingLot,
  updateParkingLot,
};
