const userModel = require('../../models');
const { validateUser, checkIfUserExists } = require('../validations/validations');

const register = async (body) => {
  await validateUser(body);
  const user = await userModel.register(body);
  return user;
};

const login = async ({ email }) => {
  const password = await checkIfUserExists(email);

  // if (!user) return false;
  // const correct = await user.correctPassword(password, user.password);

  // return {
  //   user,
  //   correct,
  // };
};

module.exports = {
  register,
  login,
};
