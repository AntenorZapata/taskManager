const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

// Create

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

// GetByAuthor

const getByAuthor = async (author) => connection().then((db) => db
  .collection('tasks').findOne({ author }));

// GetAll

const getAll = async () => connection().then((db) => db
  .collection('tasks').find().toArray())
  .then((tasks) => tasks.map(({ _id, ...task }) => ({ id: _id, ...task })));

// GetById

const getById = async (id) => connection()
  .then((db) => db.collection('tasks').findOne(ObjectId(id)));

// Delete

const remove = async (id) => {
  await connection()
    .then((db) => db.collection('tasks').findOneAndDelete({ _id: ObjectId(id) }));
};

// Update

const update = async (id, { author, task, category }) => {
  await connection().then((db) => db
    .collection('tasks').updateOne({ _id: ObjectId(id) }, { $set: { author, task, category } }));
  const updateTask = await getById(id);
  return updateTask;
};

module.exports = {
  create,
  getByAuthor,
  getAll,
  getById,
  remove,
  update,
};
