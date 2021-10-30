const Joi = require('joi');
const { ApiError } = require('../../utils/ApiError');

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

module.exports = {
  validateTask,
};
