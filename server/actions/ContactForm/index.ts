import nodemailer from "nodemailer";
import { JsonObjectExpression } from "typescript";
import { EmailMessage } from "utils/types";
export const sendContactMessage = (emailContent: EmailMessage) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.TESTEMAIL as string,
      pass: process.env.TESTPASS as string,
    },
  });

  const mailOptions = {
    from: process.env.TESTEMAIL,
    to: process.env.TESTEMAIL, //The muse email that they want the contact form to send to
    subject: emailContent.subject,
    text:
      (emailContent.message as string) +
      `\n From : ${emailContent.email as string}`,
  };

  transporter.sendMail(mailOptions, (info, error) => {
    if (error) {
      return console.log(`error: ${error as string}`);
    }
    console.log(`Message Sent ${info?.message as string}`);
  });
};
