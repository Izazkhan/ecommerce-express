import express from 'express';
var router = express.Router();
import AuthController from '../controllers/auth-controller.js';
import AuthService from '../services/auth-service.js';

const authService = new AuthService();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource??');
});


// Get User
router.get('/user/:id', authService.authenticate(), AuthController.getUser);

export default router;