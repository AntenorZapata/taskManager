const Joi = require('joi');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../../utils/ApiError');
const taskModel = require('../../models');
const userModel = require('../../models');

const validateTask = async (body) => {
  const { error } = Joi.object({
    task: Joi.string().required(),
    author: Joi.string().email().required(),
    category: Joi.string().required(),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 'invalid_fields', 400);
  }
};

const checkIfTaskExists = async (id) => {
  if (!ObjectId.isValid(id)) throw new ApiError('Invalid ID', 'invalid_fields', 400);
  const task = await taskModel.getById(id);
  if (!task) throw new ApiError('Task does not exist', 'not_found', 404);
  return task;
};

const checkIfUserExists = async (email) => {
  const user = await userModel.getByEmail(email);
  if (!user) throw new ApiError('User does not exist or Incorrect email', 'not_found', 404);
  return user;
};

const validateUser = async (body) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 'invalid_fields', 400);
  }
};

const validateUserLogin = async (body) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(body);
  if (error) {
    throw new ApiError(error.details[0].message, 'invalid_fields', 400);
  }
};

const bcryptHelper = async (pass, mod, userPass = null) => {
  if (mod === 'hash') {
    const hashPass = await bcrypt.hash(pass, 10);
    return hashPass;
  }
  const compare = await bcrypt.compare(pass, userPass);
  if (!compare) throw new ApiError('Incorrect password', 'invalid_fields', 401);
  return compare;
};

module.exports = {
  validateTask,
  checkIfTaskExists,
  validateUser,
  checkIfUserExists,
  validateUserLogin,
  bcryptHelper,

};
