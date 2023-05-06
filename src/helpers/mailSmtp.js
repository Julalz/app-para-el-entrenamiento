const { text } = require("express");
const nodemailer = require("nodemailer");
const { HTTP_SERVER, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } =
  process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});
const SendEmail = async (name, email, code) => {
  const linkActivated = `${HTTP_SERVER}/api/v1/users/activation?code=${code}`;
  console.log(linkActivated);
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject: "Welcome to Trainning App!!",
    text: `Hi ${name} confirm your account ${linkActivated}`,
  };
  const data = await transporter.sendMail(mailData);
  console.log("data", data);

  return true;
};

module.exports = SendEmail;
