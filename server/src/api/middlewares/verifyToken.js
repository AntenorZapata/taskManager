const jwt = require('jsonwebtoken');
const { checkIfUserExists } = require('../services/validations/validations');
const { ApiError } = require('../utils/ApiError');

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new ApiError('Token not found', 'not_found', 401));
  }

  try {
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

    const { email } = decoded;

    const user = await checkIfUserExists(email);

    if (!user) {
      return next(new ApiError('Expired or invalid token', 'invalid_token', 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { verifyToken };
