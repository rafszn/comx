const transporter = require("./nodemailer.config");
const dotenv = require("dotenv");
dotenv.config();

const sendResetPasswordLinkMail = async (toEmail, emailToken) => {
  const mailOptions = {
    from: {
      name: "ComX",
      address: process.env.EMAIL,
    },
    to: toEmail,
    subject: "Reset your Password",
    text: `Click this link to reset your password. ${process.env.ORIGIN}/welcome/sign-in/password-reset/pass?reset=${emailToken}. This link will expire in 5 minutes.`,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    return res
  } catch (error) {
    return error.message;
  }
};

module.exports = sendResetPasswordLinkMail;
