const express = require('express');

const router = express.Router();

const userController = require('../controllers');

router.route('/').post(userController.register);

module.exports = router;
