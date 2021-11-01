const { validateTask, checkIfTaskExists } = require('../validations/validations');
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
  await checkIfTaskExists(id);
  await validateTask(body);
  const task = await taskModel.update(id, body, user);
  return task;
};

module.exports = {
  create,
  getById,
  getAll,
  remove,
  update,
};
