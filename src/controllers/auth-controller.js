import asyncHandler from "express-async-handler";
import User from '../models/user.js';
import AuthService from "../services/auth-service.js";
import RegisterUserRequest from "../requests/register-user-request.js";

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
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const token = AuthService.generateToken(user);
      return res.status(200).json({ msg: 'Login Successful', token: token });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
}

export default AuthController;