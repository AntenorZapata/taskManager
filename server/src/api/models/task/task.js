const { ObjectId } = require('mongodb');
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

const getAll = async () => connection().then((db) => db
  .collection('tasks').find().toArray())
  .then((tasks) => tasks.map(({ _id, ...task }) => ({ id: _id, ...task })));

const getById = async (id) => connection().then((db) => db.collection('tasks').findOne(ObjectId(id)));

const remove = async (id) => connection().then((db) => db.collection('tasks').findOneAndDelete({ _id: ObjectId(id) }));

module.exports = {
  create,
  getByAuthor,
  getAll,
  getById,
  remove,
};
