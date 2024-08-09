import express from 'express';
var router = express.Router();
import RegisterController from '#controllers/auth/register-controller.js';
import LoginController from '#controllers/auth/login-controller.js';
import ResetPasswordController from '#controllers/auth/reset-password-controller.js';

// Register
router.post('/register', RegisterController.register);

// Login User
router.post('/login', LoginController.login);

// Authenticate
router.get('/authenticate', function(req, res, next) {
  res.send('Authenticate');
});

// Send reset password email
router.post('/password/email', ResetPasswordController.passwordLink);
router.post('/password/reset', ResetPasswordController.resetPassword);

export default router;