const rescue = require('express-rescue');
const taskService = require('../../services');

const create = rescue(async (req, res) => {
  const task = await taskService.create(req.body);
  return res.status(201).json(task);
});

const getByAuthor = rescue(async (req, res) => {
  const { author } = req.body;
  const task = await taskService.getByAuthor(author);
  return res.status(200).json(task);
});

module.exports = {
  create,
  getByAuthor,
};
