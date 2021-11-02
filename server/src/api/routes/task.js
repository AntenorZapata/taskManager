const express = require('express');

const router = express.Router();

const taskController = require('../controllers');
const { verifyToken } = require('../middlewares/verifyToken');

router.route('/').post(verifyToken, taskController.create)
  .get(verifyToken, taskController.getAll);

router.route('/:id').get(verifyToken, taskController.getById)
  .delete(verifyToken, taskController.remove)
  .put(verifyToken, taskController.update);

module.exports = router;
