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

module.exports = {
  create,
  getAll,
};
