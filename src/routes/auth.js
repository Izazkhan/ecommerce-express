import express from 'express';
var router = express.Router();
import RegisterController from '#controllers/auth/register-controller.js';
import LoginController from '#controllers/auth/login-controller.js';

// Register
router.post('/register', RegisterController.register);

// Login User
router.post('/login', LoginController.login);

// Authenticate
router.get('/authenticate', function(req, res, next) {
  res.send('Authenticate');
});

// Validate
router.get('/validate', function(req, res, next) {
  res.send('Validate');
});

export default router;