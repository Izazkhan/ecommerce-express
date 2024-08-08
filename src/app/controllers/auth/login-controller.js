import asyncHandler from "express-async-handler";
import User from '#models/user.js';
import RegisterUserRequest from "#requests/auth/register.js";
import LoginRequest from "#requests/auth/login.js";

import AuthService from "#services/auth-service.js";
const authService = new AuthService();

class LoginController {
    login = asyncHandler(async (req, res, next) => {
    new LoginRequest(req).validate();
    let response = await authService.loginUser(req.body.email, req.body.password);
    return res.json(response);
  });
}

export default new LoginController;