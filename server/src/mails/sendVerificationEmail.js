const transporter = require("./nodemailer.config");
const dotenv = require("dotenv");
dotenv.config();

const sendVerificationEmail = async (toEmail, code) => {
  const mailOptions = {
    from: {
      name: "ComX",
      address: process.env.EMAIL,
    },
    to: toEmail,
    subject: "Your Verification Code",
    text: `Your verification code is ${code}. It will expire in 5 minutes.`,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    return res
  } catch (error) {
    return error.message;
  }
};

module.exports = sendVerificationEmail;
