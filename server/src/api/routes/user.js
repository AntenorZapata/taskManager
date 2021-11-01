const express = require('express');

const router = express.Router();

const userController = require('../controllers');

router.route('/signup').post(userController.register);
router.route('/login').post(userController.login);
router.route('/forgotPassword').post(userController.forgotPassword);
router.route('/resetPassword/:token').post(userController.resetPassword);

module.exports = router;
