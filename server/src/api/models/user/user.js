const connection = require('../../config/connection');

const register = async ({ name, email, password }, role = 'user') => {
  const { insertedId } = await connection().then((db) => db
    .collection('user').insertOne({
      name, email, password, role, passwordResetToken: '',
    }));

  return {
    _id: insertedId, name, email, password, role,
  };
};

const getByEmail = async (email) => connection().then((db) => db
  .collection('user').findOne({ email }));

const updateUser = async (user) => connection().then((db) => db.collection('user')
  .updateOne({ email: user.email }, { $set: user }));

const findByHash = async (token) => connection().then((db) => db
  .collection('user').findOne({ passwordResetToken: token }));

module.exports = {
  register,
  getByEmail,
  findByHash,
  updateUser,
};
