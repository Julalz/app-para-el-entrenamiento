const { text } = require("express");
const nodemailer = require("nodemailer");
const { HTTP_SERVER, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } =
  process.env;

const transporter2 = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const SendEmailVerificationRemember = async (name, email, code) => {
  const linkActivated = `${HTTP_SERVER}/api/v1/users/activation/${code}`;
  console.log(linkActivated);
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject: `Hey😎 are you ${name}?. Please confirm your account`,
    text: `Hi ${name} to verify your account, please follow ${linkActivated}
      If you didn't request this code, you can ignore this message.
      Trainning App Support Team ❤
      Trainning App Help Center: https://support.prueba.com/`,
  };
  const data = await transporter2.sendMail(mailData);
  console.log("data", data);

  return true;
};

module.exports = SendEmailVerificationRemember;
