import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./email_Template.js";
import { sendEmail } from "./nodemailer.js";

async function sendEmailVerification(email, token) {
  sendEmail(
    email,
    "VERIFY YOUR EMAIL",
    VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token)
  );
}

async function sendEmailWelcome(email, name) {
  sendEmail(
    email,
    "WELCOME TO TWIITER",
    WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
  );
}

export { sendEmailVerification, sendEmailWelcome };
