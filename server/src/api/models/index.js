const {
  create, getByAuthor, getAll, getById, remove, update,
} = require('./task/task');

const { register, getByEmail } = require('./user/user');

module.exports = {
  create,
  getByEmail,
  getByAuthor,
  getAll,
  getById,
  remove,
  update,
  register,
};
