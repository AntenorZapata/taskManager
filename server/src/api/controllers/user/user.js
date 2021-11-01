const userService = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const register = catchAsync(async (req, res, next) => {
  const user = await userService.register(req.body);
  return res.status(201).json(user);
});

const login = catchAsync(async (req, res) => {
  await userService.login(email, password);
});

module.exports = {
  register,
  login,
};
