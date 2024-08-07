import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    
    this.mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: process.env.APP_NAME,
        link: process.env.APP_URL,
      },
    });
  }

  generateEmailBody(templateData) {
    try {
      return this.mailGenerator.generate(templateData);
    } catch (error) {
      console.error('Failed to generate email body:', error.message);
      throw error;
    }
  }

  async sendMail({ to, subject, templateData }) {
    try {
      const emailBody = this.generateEmailBody(templateData);
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM_ADDRESS,
        to,
        subject,
        html: emailBody,
      });

    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }
}

export default MailService;
