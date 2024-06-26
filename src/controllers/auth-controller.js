import asyncHandler from "express-async-handler";
import User from '../models/user.js';
import RegisterUserRequest from "../requests/auth/register.js";
import LoginRequest from "../requests/auth/login.js";

import UserService from "../services/user-service.js";
const userService = new UserService();

class AuthController {
  static getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user.name);
  });

  static register = asyncHandler(async (req, res, next) => {
    // Validate request data
    new RegisterUserRequest(req).validate();
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      await user.save();
      return res.status(201).json({ msg: 'User registered successfully' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  });

  static login = asyncHandler(async (req, res, next) => {
    new LoginRequest(req).validate();
    let ress = await userService.loginUser(req.body.email, req.body.password);
    return res.json(ress);
  });
}

export default AuthController;