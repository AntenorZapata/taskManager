const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { ApiError } = require('../../utils/ApiError');
const taskModel = require('../../models');

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

module.exports = {
  validateTask,
  checkIfTaskExists,
};
