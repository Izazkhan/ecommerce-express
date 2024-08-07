import { resetPasswordMail } from '#mails/reset-password-mail.js';
import MailService from '#services/mail-service.js';

export const resetPasswordEmailJob = async ({data}) => {
  const mailService = new MailService();
  const ResetPasswordMail = resetPasswordMail(data.user, 'http://localhost:4200/reset-password');
  await mailService.sendMail({
    to: data.user.email,
    subject: 'Reset Password',
    templateData: ResetPasswordMail
  });
};