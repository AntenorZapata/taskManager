const { validateTask } = require('../validations/taskValidations');

const create = async (body) => {
  await validateTask(body);
  // return task;
};

module.exports = {
  create,
};
