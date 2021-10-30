const connection = require('../../config/connection');

const create = async ({ task, author, category }) => {
  const { insertedId } = await connection().then((db) => db
    .collection('tasks').insertOne({
      task,
      author,
      category,
      status: 'Em andamento',
      createAt: Date(),
    }));

  return { status: 'success', id: insertedId };
};

module.exports = {
  create,
};
