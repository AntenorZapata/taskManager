const userModel = require('../../models');

const register = async (body) => {
  const user = await userModel.register(body);
  return user;
};

module.exports = {
  register,
};
