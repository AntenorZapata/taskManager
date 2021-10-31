const { validateTask } = require('../validations/taskValidations');
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
  const task = await taskModel.getById(id);
  return task;
};

const remove = async (id) => {
  await taskModel.remove(id);
};

const update = async (req, res) => {
  const task = await taskModel.update(req.params.id);
  return task;
};

module.exports = {
  create,
  getById,
  getAll,
  remove,
  update,
};
