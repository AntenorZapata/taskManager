const connection = require('../../config/connection');

const register = async ({ name, email, password }) => {
  const { insertedId } = await connection().then((db) => db
    .collection('user').insertOne({ name, email, password }));

  return {
    _id: insertedId, name, email, password,
  };
};

const getByEmail = async (email) => connection().then((db) => db.collection('user').findOne({ email }));

module.exports = {
  register,
  getByEmail,
};
