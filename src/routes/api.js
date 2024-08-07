import express from 'express';
var router = express.Router();
import AuthController from '#controllers/auth/login-controller.js';
import Passport from '#services/passport-service.js';
import UserController from '#controllers/user-controller.js';

const passport = new Passport();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource??');
});

/* GET users listing. */
router.get('/user/:id', UserController.getUser);


// Get User
router.get('/user/:id', passport.authenticate(), UserController.getUser);

export default router;