const express = require('express');
const error = require('./middlewares/globalErrors');

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(error.errorHandler);
  return app;
};
