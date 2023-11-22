const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password, deviceId } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  // const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user });
});

const registerDevice = catchAsync(async (req, res) => {
  const { deviceId, email, passcode } = req.body;
  const user = await authService.registerUserDeviceIdAndPasscode(deviceId, email, passcode); // handle when two users have the same device id
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const loginDevice = catchAsync(async (req, res) => {
  const { deviceId, passcode } = req.body;
  const user = await authService.loginUserWithDeviceIdAndPasscode(deviceId, passcode); // handle when two users have the same device id
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const createPin = catchAsync(async (req, res) => {
  const { pin } = req.body;
  const userId = req.user.id;
  const user = await authService.createPinForUser(pin, userId);
  return res.send({ user });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  registerDevice,
  loginDevice,
  createPin,
};
