const userService = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  return res.status(201).json(user);
});

module.exports = {
  register,
};
