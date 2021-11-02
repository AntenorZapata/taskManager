const {
  create, getAll, getById, remove, update, updateStatus,
} = require('./task/task');

const {
  register, login, forgotPassword, reset, updateUser,
} = require('./user/user');

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  register,
  login,
  forgotPassword,
  reset,
  updateUser,
  updateStatus,
};
