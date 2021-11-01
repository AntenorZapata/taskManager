const taskService = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const task = await taskService.create(req.body, req.user);
  return res.status(201).json(task);
});

const getAll = catchAsync(async (req, res) => {
  const tasks = await taskService.getAll();
  return res.status(200).json(tasks);
});

const getById = catchAsync(async (req, res) => {
  const task = await taskService.getById(req.params.id);
  return res.status(200).json(task);
});

const remove = catchAsync(async (req, res) => {
  await taskService.remove(req.params.id);
  return res.status(204).json(null);
});

const update = catchAsync(async (req, res) => {
  const { body, user } = req;
  const task = await taskService.update(req.params.id, body, user);
  return res.status(200).json(task);
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
