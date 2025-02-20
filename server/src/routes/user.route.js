const express = require("express");
const verifyAccessToken = require("../helpers/verifyAccessToken");
const { currentUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/auth.me", verifyAccessToken, currentUser);

module.exports = router;
