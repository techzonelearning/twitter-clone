import nodemailer from "nodemailer";
import "dotenv/config"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "techzonedm786@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

let sender = {
  email: "techzonedm786@gmail.com",
  name: "Twitter Clone",
};

export function sendEmail(to, subject, html) {
  transporter
    .sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: to,
      subject: subject,
      html: html,
    })
    .then((info) => {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    })
    .catch(console.error);
}


