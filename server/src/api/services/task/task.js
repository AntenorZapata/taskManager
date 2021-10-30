const { validateTask } = require('../validations/taskValidations');
const taskModel = require('../../models');

const create = async (body) => {
  await validateTask(body);
  const task = await taskModel.create(body);
  return task;
};

const getByAuthor = async (author) => {
  const task = await taskModel.getByAuthor(author);
  return task;
};

module.exports = {
  create,
  getByAuthor,
};
