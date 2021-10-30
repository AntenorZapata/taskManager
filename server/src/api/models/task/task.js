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

const getAll = async () => {
  const tasks = await connection().then((db) => db
    .collection('tasks').find().toArray());

  return tasks;
};

module.exports = {
  create,
  getByAuthor,
  getAll,
};
