const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = require("./helpers/corsOptions");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const connectDB = require("./helpers/connectDB");
dotenv.config();

const app = express();
const port = process.env.PORT || 9703;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" server is on ✔");
});

app.use("/api/v1/", authRoute);
app.use("/api/v1/", userRoute);

app.listen(port, async () => {
  try {
    await connectDB();
    console.log("server is on ✔");
  } catch (error) {
    console.error("Server error", error);
    process.exit(1);
  }
});

module.exports = app;
