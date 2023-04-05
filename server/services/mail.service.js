const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const STRINGS = require("../utils/text");
const ENV = process.env;
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: ENV.MAILER_HOST,

      auth: {
        user: ENV.MAILER_SENDER_EMAIL,
        pass: ENV.MAILER_PASSWORD,
      },
    });
  }

  async sendForgotPasswordEmail(user, otp) {
    let from = `${ENV.APP_NAME} <no-reply${ENV.MAILER_DOMAIN}>`;
    if (!user) res.status(400).json({ message: STRINGS.ERRORS.userNotFound });
    // Email Starts
    const filePath = path.join(
      __dirname,
      "../html_templates/forgotPassword.html"
    );

    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      otp: otp,
    };
    const htmlToSend = template(replacements);

    await this.transporter
      .sendMail({
        from,
        to: user.email,
        subject: STRINGS.TEXTS.forgotPasswordEmailSubject,
        html: htmlToSend,
      })
      .then(() => console.log("success"))
      .catch((err) => console.log("Error--->", err.message));

    return;
  }
}

module.exports = new MailService();
