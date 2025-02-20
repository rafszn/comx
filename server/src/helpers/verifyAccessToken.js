const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const { authorization: cookie } = req.headers;

  if (!cookie || !cookie.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized!",
    });
  }
  const token = cookie.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized!",
    });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err)
      return res.status(403).json({
        status: "failed",
        message: "Invalid token!",
      });
    req.user = {
      id: payload.id,
      userType: payload.userType,
    };
    next();
  });
};

module.exports = verifyToken;
