const bcrypt = require('bcryptjs');
const userModel = require('../../models');
const {
  validateUser, checkIfUserExists, validateUserLogin, correctPassword,
} = require('../validations/validations');

const register = async ({ name, email, password }) => {
  await validateUser({ name, email, password });
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.register({ name, email, password: hash });
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
