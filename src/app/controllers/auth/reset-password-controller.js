import expressAsyncHandler from "express-async-handler";
import { dispatch } from '#services/queues/dispatch.js';
class ResetPasswordController {

    static resetPassword = expressAsyncHandler(async (req, res, next) => {
        // check this email exists in DB?
        // if yes then send email otherwise throw error
        await dispatch('resetPasswordEmailJob', {
            user: {
                name: "Izaz Khan",
                email: 'izaz@example.com'
            }
        });
        return res.status(200).json({msg: 'Reset password email sent.'});
    });
}

export default ResetPasswordController;