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

const getByAuthor = async (author) => {
  const task = await connection().then((db) => db
    .collection('tasks').findOne({ author }));

  return task;
};

module.exports = {
  create,
  getByAuthor,
};
