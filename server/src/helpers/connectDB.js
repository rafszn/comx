const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected ✔");
  }
};

module.exports = connectDB;
