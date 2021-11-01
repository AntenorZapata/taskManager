const userService = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const register = catchAsync(async (req, res, next) => {
  const user = await userService.register(req.body);
  return res.status(201).json(user);
});

const login = catchAsync(async (req, res) => {
  const userLogin = await userService.login(req.body);
  if (userLogin) return sendToken(userLogin, 200, res);
});

module.exports = {
  register,
  login,
};
