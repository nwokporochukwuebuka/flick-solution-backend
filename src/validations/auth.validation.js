const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin'),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    deviceId: Joi.string(),
  }),
};

const registerPasscode = {
  body: Joi.object().keys({
    deviceId: Joi.string().required(),
    passcode: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const loginDeviceWithPasscode = {
  body: Joi.object().keys({
    deviceId: Joi.string().required(),
    passcode: Joi.string().required(),
  }),
};

const createPin = {
  body: Joi.object().keys({
    pin: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  registerPasscode,
  loginDeviceWithPasscode,
  createPin,
};
