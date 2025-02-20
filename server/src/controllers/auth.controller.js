const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { CorporateModel, IndividualModel } = require("../models/user.model");
const sendVerificationEmail = require("../mails/sendVerificationEmail");
const sendWelcomeMail = require("../mails/sendWelcomeMail");
const sendResetPasswordLinkMail = require("../mails/sendResetPasswordLinkMail");
require("dotenv").config();

const registerUser = async (req, res) => {
  const {
    userType,
    password,
    confirmPassword,
    email,
    companyEmail,
    firstname,
    companyName,
    ...rest
  } = req.body;

  if (!userType || (userType !== "Individual" && userType !== "Corporate")) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid or missing user type" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "failed", message: "Passwords do not match" });
  }

  try {
    let existingUser;

    if (userType === "Individual") {
      existingUser = await IndividualModel.findOne({
        $or: [{ email }, { firstname }],
      });
    } else if (userType === "Corporate") {
      existingUser = await CorporateModel.findOne({
        $or: [{ companyEmail }, { companyName }],
      });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid user type" });
    }

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User with provided details already exists",
      });
    }

    // Generate a 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // valid for 5 mins

    let user;
    if (userType === "Individual") {
      user = new IndividualModel({
        email,
        firstname,
        password,
        verificationCode,
        verificationExpires: expiresAt,
        isVerified: false,
        ...rest,
      });
    } else {
      user = new CorporateModel({
        companyEmail,
        companyName,
        password,
        verificationCode,
        verificationExpires: expiresAt,
        isVerified: false,
        ...rest,
      });
    }
    await user.save();

    // Send verification email with code to user's email address or company email address
    await sendVerificationEmail(
      userType === "Individual" ? email : companyEmail,
      verificationCode,
    );

    res
      .status(201)
      .json({ status: "success", message: "User registered successfully" });
  } catch {
    res
      .status(500)
      .json({ status: "failed", message: "server error, try again" });
  }
};
const verifyUser = async (req, res) => {
  const { userType, email, companyEmail, code } = req.body;

  if (!code) {
    return res
      .status(400)
      .json({ status: "failed", message: "Code is required" });
  }

  let user;
  if (userType === "Individual") {
    user = await IndividualModel.findOne({ email });
  } else {
    user = await CorporateModel.findOne({ companyEmail });
  }

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }

  if (user.verificationCode !== code || user.verificationExpires < new Date()) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid or expired verification code",
    });
  }

  user.isVerified = true;
  user.verificationCode = null;
  user.verificationExpires = null;

  await user.save();
  await sendWelcomeMail(userType === "Individual" ? email : companyEmail);

  res
    .status(200)
    .json({ status: "success", message: "Email verified successfully" });
};
const resendVerificationCode = async (req, res) => {
  const { email, userType } = req.body;

  if (!email || !userType) {
    return res
      .status(400)
      .json({ status: "failed", message: "Email and userType are required" });
  }

  try {
    let user;

    if (userType === "Individual") {
      user = await IndividualModel.findOne({ email });
    } else if (userType === "Corporate") {
      user = await CorporateModel.findOne({ companyEmail: email });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid user type" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ status: "failed", message: "User is already verified" });
    }

    // Prevent excessive resends (e.g., allow once per minute)
    const now = new Date();
    if (
      user.verificationExpires &&
      (now - user.verificationExpires) / 1000 < 60
    ) {
      return res.status(429).json({
        status: "failed",
        message: "Please wait before requesting a new code",
      });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = verificationCode;
    user.verificationExpires = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 mins
    await user.save();

    // Send email with new verification code
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({
      status: "success",
      message: "Verification code resent successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Server error, try again later" });
  }
};
const signInUser = async (req, res) => {
  const { email, password, staySignedIn } = req.body;

  try {
    let user = await IndividualModel.findOne({ email });
    if (!user) {
      user = await CorporateModel.findOne({ companyEmail: email });
    }
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
      },
      process.env.JWT_KEY,
      {
        expiresIn: staySignedIn ? "30d" : "1d",
      },
    );

    res.status(200).json({
      status: "success",
      message: "Sign-in successful",
      userType: user.userType,
      token,
    });
  } catch {
    res
      .status(500)
      .json({ status: "failed", message: "Server error, try again" });
  }
};

async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      status: "failed",
      message: "No email provided",
    });
  }

  try {
    let user = await IndividualModel.findOne({ email });
    if (!user) {
      user = await CorporateModel.findOne({ companyEmail: email });
    }
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "This account doesnt exist" });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const payload = { id: user._id, userType: user.userType };
    const token = jwt.sign(payload, secret, {
      expiresIn: "5m",
    });

    await sendResetPasswordLinkMail(email, token);

    res.status(200).json({
      status: "success",
      message: "Reset link sent! Check your email.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: "Error sending password reset email",
    });
  }
}

async function resetPassword(req, res) {
  const { newPassword } = req.body;
  const { reset: token } = req.query;
  if (!token || !newPassword) {
    return res.status(400).json({
      status: "failed",
      message: "No reset password token or new password provided",
    });
  }

  try {
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Token" });
    }
    const { id, userType } = decoded;

    let user;
    if (userType === "Individual") {
      user = await IndividualModel.findById(id);
    } else if (userType === "Corporate") {
      user = await CorporateModel.findById(id);
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid user type" });
    }

    if (!user) {
      res.status(400).json({ status: "failed", message: "User not found" });
    }

    const secret = process.env.JWT_SECRET + user.password;
    jwt.verify(token, secret);

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch {
    res.status(500).json({
      status: "failed",
      message: "Invalid or expired token",
    });
  }
}

module.exports = {
  registerUser,
  verifyUser,
  resendVerificationCode,
  signInUser,
  forgotPassword,
  resetPassword,
};
