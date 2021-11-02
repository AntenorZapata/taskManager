const { validateTask, checkIfTaskExists, validateOwnership } = require('../validations/validations');
const taskModel = require('../../models');

const create = async (body, user) => {
  await validateTask(body);
  const task = await taskModel.create(body, user);
  return task;
};

const getAll = async () => {
  const tasks = await taskModel.getAll();
  return tasks;
};

const getById = async (id) => {
  await checkIfTaskExists(id);
  const task = await taskModel.getById(id);
  return task;
};

const remove = async (id) => {
  await checkIfTaskExists(id);
  await taskModel.remove(id);
};

const update = async (id, body, user) => {
  const task = await checkIfTaskExists(id);
  await validateTask(body);
  await validateOwnership(user.email, task.author);
  const newTask = await taskModel.update(id, body, user);
  return newTask;
};

module.exports = {
  create,
  getById,
  getAll,
  remove,
  update,
};
