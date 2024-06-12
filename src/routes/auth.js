import express from 'express';
var router = express.Router();
import userController from '../controllers/usersController.js';
import expressAsyncHandler from 'express-async-handler';
// Register
router.get('/register', userController.getUser);

// Authenticate
router.get('/authenticate', function(req, res, next) {
  res.send('Authenticate');
});

// Profile
router.get('/profile', function(req, res, next) {
    userController.getUser("Izaz")
});

// Validate
router.get('/validate', function(req, res, next) {
  res.send('Validate');
});

export default router;