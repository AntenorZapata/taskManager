const userModel = require('../../models');
const {
  validateUser, checkIfUserExists, validateUserLogin, bcryptHelper,
  validateEmail,
} = require('../validations/validations');
const { generateResetToken } = require('../../utils/generateResetToken');

const register = async ({ name, email, password }) => {
  await validateUser({ name, email, password });
  const hash = await bcryptHelper(password, 'hash');
  const user = await userModel.register({ name, email, password: hash });
  return user;
};

const login = async (body) => {
  await validateUserLogin(body);
  const user = await checkIfUserExists(body.email);
  const validUser = await bcryptHelper(body.password, 'compare', user.password);
  if (validUser) return user;
};

const forgotPassword = async (email) => {
  await validateEmail({ email });
  const user = await checkIfUserExists(email);
  const { resetToken, hashedToken } = generateResetToken();

  const newUser = { ...user, passwordResetToken: hashedToken(resetToken) };
  await userModel.updateUser(newUser);

  const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`;
  const message = `Update your password: ${resetUrl}`;
  return { user, message };
};

const reset = async (token, password) => {
  const hashedToken = generateResetToken().hashedToken(token);
  const user = await userModel.findByHash(hashedToken);
  const newUser = { ...user, password, passwordResetToken: '' };
  await userModel.updateUser(newUser);
};

module.exports = {
  register,
  login,
  reset,
  forgotPassword,
};
