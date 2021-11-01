const {
  create, getByAuthor, getAll, getById, remove, update,
} = require('./task/task');

const { register } = require('./user/user');

module.exports = {
  create,
  getByAuthor,
  getAll,
  getById,
  remove,
  update,
  register,
};
