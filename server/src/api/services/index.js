const {
  create, getAll, getById, remove, update,
} = require('./task/task');

const { register, login, forgotPassword } = require('./user/user');

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  register,
  login,
  forgotPassword,
};
