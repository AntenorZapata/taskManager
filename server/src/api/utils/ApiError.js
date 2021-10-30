class ApiError extends Error {
  constructor(message, code, statusCode) {
    super();
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
  }
}

module.exports = {
  ApiError,
};
