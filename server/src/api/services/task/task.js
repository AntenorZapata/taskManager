const { validateTask, checkIfTaskExists } = require('../validations/taskValidations');
const taskModel = require('../../models');

const create = async (body) => {
  await validateTask(body);
  const task = await taskModel.create(body);
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

const update = async (id, body) => {
  await validateTask(body);
  await checkIfTaskExists(id);
  const task = await taskModel.update(id, body);
  return task;
};

module.exports = {
  create,
  getById,
  getAll,
  remove,
  update,
};
