const rescue = require('express-rescue');

const create = rescue(async (req, res) => {
  const task = await taskService.create(req.body);
  return res.status(201).json();
});

module.exports = {
  create,
};
