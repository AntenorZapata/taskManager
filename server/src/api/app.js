const express = require('express');
const cors = require('cors');
const error = require('./middlewares/globalErrors');
const route = require('./routes');

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use('/api/v1/task', route.task);
  app.use('/api/v1/user', route.user);
  app.use(error.errorHandler);
  return app;
};
