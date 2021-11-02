const {
  create, getByAuthor, getAll, getById, remove, update, updateStatus,
} = require('./task/task');

const {
  register, getByEmail, findByHash, updateUser,
} = require('./user/user');

module.exports = {
  create,
  getByEmail,
  getByAuthor,
  getAll,
  getById,
  remove,
  update,
  register,
  updateUser,
  findByHash,
  updateStatus,
};
