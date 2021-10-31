const express = require('express');

const router = express.Router();

const taskController = require('../controllers');

router.route('/').post(taskController.create).get(taskController.getAll);
router.route('/:id').get(taskController.getById).delete(taskController.remove)
  .put(taskController.update);

module.exports = router;
