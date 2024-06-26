import express from 'express';
var router = express.Router();
import AuthController from '../controllers/auth-controller.js';
import AuthService from '../services/auth-service.js';

const authService = new AuthService();

// Register
router.post('/register', AuthController.register);

// Login User
router.post('/login', AuthController.login);

// Authenticate
router.get('/authenticate', function(req, res, next) {
  res.send('Authenticate');
});

// Profile
router.get('/profile', function(req, res, next) {
    AuthController.getUser("Izaz")
});

// Validate
router.get('/validate', function(req, res, next) {
  res.send('Validate');
});

export default router;