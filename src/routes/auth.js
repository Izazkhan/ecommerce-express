import express from 'express';
var router = express.Router();
import AuthController from '../controllers/AuthController.js';
import expressAsyncHandler from 'express-async-handler';
// Register
router.get('/register', AuthController.register);

// Get User
router.get('/user/:id/detail', AuthController.getUser);

// Login User
router.get('/login', AuthController.login);

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