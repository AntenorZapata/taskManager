const rescue = require('express-rescue');
const taskService = require('../../services');

const create = rescue(async (req, res) => {
  const task = await taskService.create(req.body);
  return res.status(201).json(task);
});

module.exports = {
  create,
};
