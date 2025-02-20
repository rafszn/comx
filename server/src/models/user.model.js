const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["Individual", "Corporate"],
    },
    password: { type: String, required: true },
  },
  { discriminatorKey: "userType", timestamps: true },
);

//This function encrypts the password before it is saved
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

// Schema for usertype: Individual
const individualSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  countryCode: { type: String, default: "+234" },
  verificationCode: String,
  verificationExpires: Date,
  isVerified: { type: Boolean, default: false },
});

// Schema for usertype: Corporate
const corporateSchema = new Schema({
  companyName: { type: String, required: true, unique: true },
  businessType: { type: String, required: true },
  dateOfIncorporation: { type: Date, required: true },
  companyEmail: { type: String, required: true, unique: true },
  verificationCode: String,
  verificationExpires: Date,
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
const IndividualModel = User.discriminator("Individual", individualSchema);
const CorporateModel = User.discriminator("Corporate", corporateSchema);

module.exports = { IndividualModel, CorporateModel };
