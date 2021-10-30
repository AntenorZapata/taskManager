const express = require('express');

const router = express.Router();

const taskController = require('../controllers');

router.route('/').post(taskController.create).get(taskController.getAll)
  .get(taskController.getByAuthor);

module.exports = router;
