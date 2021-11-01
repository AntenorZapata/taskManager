const userModel = require('../../models');
const {
  validateUser, checkIfUserExists, validateUserLogin, correctPassword,
} = require('../validations/validations');

const register = async (body) => {
  await validateUser(body);
  const user = await userModel.register(body);
  return user;
};

const login = async (body) => {
  validateUserLogin(body);
  const { email, password } = body;
  const user = await checkIfUserExists(email);
};

module.exports = {
  register,
  login,
};
