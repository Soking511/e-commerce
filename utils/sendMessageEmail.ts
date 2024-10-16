import nodemailer, { SendMailOptions } from 'nodemailer';
import { EmailOptions } from '../Apps/moreInterfaces/messageEmail';
import fs from 'fs';
import path from 'path';

const templatePath = path.resolve(__dirname, '../Apps/emailComponent/index.html');

const sendMessageEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let emailTemplate = fs.readFileSync(templatePath, 'utf-8');
  let customizedTemplate = emailTemplate.replace('<span id="resetCode"></span> </span>', `<span id="resetCode">${options.message}</span>`)

  const emailOptions: SendMailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: customizedTemplate
  };
  await transporter.sendMail(emailOptions);
};

export default sendMessageEmail;


