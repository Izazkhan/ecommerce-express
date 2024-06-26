import asyncHandler from "express-async-handler";
import UserModel from '#models/user.js';
import UserService from '#services/user-service.js';
import RegisterUserRequest from "#requests/auth/register.js";

const userService = new UserService();

class RegisterController {
    
    static register = asyncHandler(async (req, res, next) => {
      // Validate request data
      new RegisterUserRequest(req).validate();
      const { name, email, password } = req.body;
      try {
        let user = await UserModel.findOne({ email });
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
}

export default RegisterController;