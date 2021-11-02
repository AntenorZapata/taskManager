const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const {
    _id, email, role, name,
  } = user;

  const jwtConfig = {
    expiresIn: '60min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({
    id: _id, name, email, role,
  }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = {
  generateToken,
};
