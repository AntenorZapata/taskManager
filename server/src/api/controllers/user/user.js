const userService = require('../../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
});

module.exports = {
  register,
};
