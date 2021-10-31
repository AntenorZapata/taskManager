const express = require('express');
const error = require('./middlewares/globalErrors');
const route = require('./routes');

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/task', route.task);
  app.use(error.errorHandler);
  return app;
};
