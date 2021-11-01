const connection = require('../../config/connection');

const register = async ({ name, email, password }, role = 'user') => {
  const { insertedId } = await connection().then((db) => db
    .collection('user').insertOne({
      name, email, password, role,
    }));

  return {
    _id: insertedId, name, email, password, role,
  };
};

const getByEmail = async (email) => connection().then((db) => db
  .collection('user').findOne({ email }));

module.exports = {
  register,
  getByEmail,
};
