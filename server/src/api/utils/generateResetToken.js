const crypto = require('crypto');

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  return { resetToken, hashedToken };
};

module.exports = {
  generateResetToken,
};