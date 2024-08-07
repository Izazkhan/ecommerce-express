import dotenv from 'dotenv';
dotenv.config();

export const resetPasswordMail = (user, resetLink) => {
    return {
        body: {
            name: user.name,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: resetLink,
                },
            },
            outro: 'If you did not request a password reset, please ignore this email.',
        }
    }
};