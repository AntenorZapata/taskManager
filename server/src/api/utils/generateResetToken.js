const crypto = require('crypto');

const generateResetToken = () => ({
  resetToken: crypto.randomBytes(20).toString('hex'),
  hashedToken: (token) => crypto
    .createHash('sha256')
    .update(token)
    .digest('hex'),

});

module.exports = {
  generateResetToken,
};
