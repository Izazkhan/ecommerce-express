import express from 'express';
var router = express.Router();
import AuthController from '#controllers/auth/login-controller.js';
import Passport from '#services/passport-service.js';
import UserController from '#controllers/user-controller.js';
import {myQueue} from '#queues/queue.js';
import {forgotPasswordEmailJob} from '#jobs/forgotPasswordEmailJob.js';

const passport = new Passport();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource??');
});

/* GET users listing. */
router.get('/user/:id', UserController.getUser);


// Get User
router.get('/user/:id', passport.authenticate(), UserController.getUser);

router.get('/jobs', async function(req, res, next) {
  await forgotPasswordEmailJob({email: 'izaz@example.com'});
  return res.send("Success");
});

export default router;