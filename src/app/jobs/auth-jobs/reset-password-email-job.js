import { resetPasswordMail } from '#mails/reset-password-mail.js';
import MailService from '#services/mail-service.js';

export const resetPasswordEmailJob = async ({data}) => {
  const mailService = new MailService();
  const ResetPasswordMail = resetPasswordMail(data.user, data.resetPasswordLink);
  await mailService.sendMail({
    to: data.user.email,
    subject: 'Reset Password Notification',
    templateData: ResetPasswordMail
  });
};