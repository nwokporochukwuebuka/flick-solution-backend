const cloudinary = require('cloudinary').v2;
const config = require('../config/config');

cloudinary.config({
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.secretKey,
  cloud_name: config.cloudinary.cloudName,
});

module.exports = cloudinary;
