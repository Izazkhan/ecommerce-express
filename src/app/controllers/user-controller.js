import asyncHandler from "express-async-handler";
import UserModel from '#models/user.js';

class UserController {
    static getUser = asyncHandler(async (req, res, next) => {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            throw new Error('User not found');
        }
        res.json({user});
    });
}

export default UserController;