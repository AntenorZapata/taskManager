const userService = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const { generateToken } = require('../../utils/generateToken');
const userModel = require('../../models');
const { ApiError } = require('../../utils/ApiError');
const sendEmail = require('../../utils/email');

const register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  return res.status(201).json(user);
});

const login = catchAsync(async (req, res) => {
  const userLogin = await userService.login(req.body);
  const token = await generateToken(userLogin);
  return res.status(200).json({ token });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { user, message } = await userService.forgotPassword(email);
  try {
    await sendEmail({
      to: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    return next(
      new ApiError(
        'There was an error sending the email. Trye again later!',
        'email_error',
        500,
      ),
    );
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  await userService.reset(token, req.body.password);
  return res.status(200).json({ status: 'success', message: 'password updated' });
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,

};
