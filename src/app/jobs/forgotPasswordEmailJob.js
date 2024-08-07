import { resetPasswordMail } from '#mails/reset-password-mail.js';
import MailService from '#services/mail-service.js';

export const forgotPasswordEmailJob = async (job) => {
  const { to } = job;

  const mailService = new MailService();
  const ResetPasswordMail = resetPasswordMail({name: 'Izaz Khan'}, 'http://localhost:4200/reset-password');

  await mailService.sendMail({
    to,
    subject: 'Reset Password',
    templateData: ResetPasswordMail
  });
};