const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

// Create

const create = async ({ task, category }, user) => {
  const { insertedId } = await connection().then((db) => db
    .collection('tasks').insertOne({
      task,
      author: user.email,
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

// Update StatusCode
const updateStatus = async (id, newStatus) => connection()
  .then((db) => db.collection('tasks').updateOne({ _id: ObjectId(id) },
    { $set: { status: newStatus || 'Em andamento' } }));

// Update

const update = async (id, { task, category }, user) => {
  const updateAt = Date();
  const status = 'Em andamento';
  await connection().then((db) => db
    .collection('tasks').updateOne({ _id: ObjectId(id) },
      {
        $set: {
          author: user.email, task, category, status, updateAt,
        },
      }));
  return {
    _id: id,
    task,
    category,
    author: user.email,
    status,
    updateAt,
  };
};

module.exports = {
  create,
  getByAuthor,
  getAll,
  getById,
  remove,
  update,
  updateStatus,
};
