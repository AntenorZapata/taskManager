const errorHandler = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      err: { code: err.code, message: err.message },
    });
  }
};

module.exports = {
  errorHandler,
};
