const userModel = require('../../models');
const {
  validateUser, checkIfUserExists, validateUserLogin, bcryptHelper,
} = require('../validations/validations');

const register = async ({ name, email, password }) => {
  await validateUser({ name, email, password });
  const hash = await bcryptHelper(password, 'hash');
  const user = await userModel.register({ name, email, password: hash });
  return user;
};

const login = async (body) => {
  await validateUserLogin(body);
  const { email, password } = body;
  const user = await checkIfUserExists(email);
  const validUser = await bcryptHelper(password, 'compare', user.password);
  if (validUser) return user;
};

module.exports = {
  register,
  login,
};
