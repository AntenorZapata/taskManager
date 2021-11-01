const userService = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const { generateToken } = require('../../utils/generateToken');
const userModel = require('../../models');
const { ApiError } = require('../../utils/ApiError');

const register = catchAsync(async (req, res, next) => {
  const user = await userService.register(req.body);
  return res.status(201).json(user);
});

const login = catchAsync(async (req, res) => {
  const userLogin = await userService.login(req.body);
  const token = await generateToken(userLogin);
  return res.status(200).json({ token });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const { user, message } = await userService.forgotPassword(email);
});

module.exports = {
  register,
  login,
  forgotPassword,

};
