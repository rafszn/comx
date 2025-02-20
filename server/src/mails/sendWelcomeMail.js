const transporter = require("./nodemailer.config");
const dotenv = require("dotenv");
dotenv.config();

const sendWelcomeMail = async (toEmail) => {
  const mailOptions = {
    from: {
      name: "ComX",
      address: process.env.EMAIL,
    },
    to: toEmail,
    subject: "Account Verified",
    text: `Account verification successful`,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    return res
  } catch (error) {
    return error.message;
  }
};

module.exports = sendWelcomeMail;
