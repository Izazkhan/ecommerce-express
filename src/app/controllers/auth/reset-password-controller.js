import expressAsyncHandler from "express-async-handler";
import { dispatch } from '#services/queues/dispatch.js';
import PassportService from "#services/passport-service.js";
import UserService from "#services/user-service.js"
import dotenv from 'dotenv';
import crypto from 'crypto';
import bcrypt from "bcrypt";

dotenv.config();

class ResetPasswordController {

    constructor() {
        this.passportService = new PassportService();
        this.userService = new UserService;
    }

    passwordLink = expressAsyncHandler(async (req, res, next) => {

        try {
            // check this email exists in DB?
            let user = await this.userService.findByEmail(req.body.email);

            if (!user) {
                return res.status(404).json({ message: 'Invalid email address.' });
            }

            const token = crypto.randomBytes(15).toString('base64')
                .replace(/\+/g, '-')  // Replace + with -
                .replace(/\//g, '_')  // Replace / with _
                .replace(/=+$/, '')
                .substring(0, 20);
            user.token = token;
            await user.save();

            await dispatch('resetPasswordEmailJob', {
                user: user,
                resetPasswordLink: `${process.env.FRONTEND_APP_URL}/reset-password/${token}`
            });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong. Please contact support if this issue persists.' });
        }
        return res.status(200).json({ message: 'Reset password email sent.' });
    });

    resetPassword = expressAsyncHandler(async (req, res, next) => {
        try {
            let user = await this.userService.getUserByToken(req.body.token);
            if (!user) {
                return res.status(403).json({message: 'Token is expired'});
            }
            // this will be hashed, in user model
            user.password = req.body.password;
            user.token = '';
            
            await user.save();
            return res.json({message: 'Password updated successfully.'});
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong. Please contact support if this issue persists.' });
        }
    })
}

export default new ResetPasswordController();