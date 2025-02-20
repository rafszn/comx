const express = require("express");
const {
  registerUser,
  verifyUser,
  resendVerificationCode,
  signInUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/auth.register", registerUser);
router.post("/auth.verify", verifyUser);
router.post("/auth.resend", resendVerificationCode);
router.post("/auth.signin", signInUser);
router.post("/auth.forgotten-pass", forgotPassword);
router.post("/auth.reset-pass", resetPassword);

module.exports = router;
