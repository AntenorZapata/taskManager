const rescue = require('express-rescue');
const taskService = require('../../services');

const create = rescue(async (req, res) => {
  const task = await taskService.create(req.body);
  return res.status(201).json(task);
});

const getAll = rescue(async (req, res) => {
  const tasks = await taskService.getAll();
  return res.status(200).json(tasks);
});

const getById = rescue(async (req, res) => {
  const task = await taskService.getById(req.params.id);
  return res.status(200).json(task);
});

const remove = rescue(async (req, res) => {
  await taskService.remove(req.params.id);
  return res.status(204).json(null);
});

const update = rescue(async (req, res) => {
  const task = await taskService.update(req.params.id);
  return res.status(200).json(task);
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
