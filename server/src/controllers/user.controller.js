const { IndividualModel, CorporateModel } = require("../models/user.model");

const currentUser = async (req, res) => {
  const { id, userType } = req.user;
  try {
    let existingUser;

    if (userType === "Individual") {
      existingUser = await IndividualModel.findById(id).select(
        "firstname lastname userType email phoneNumber countryCode -_id",
      ); // Explicitly return specific fields
    } else if (userType === "Corporate") {
      existingUser = await CorporateModel.findById(id).select(
        "companyName companyEmail businessType userType dateOfIncorporation -_id",
      ); // Explicitly return specific fields
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });
    }

    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      user: existingUser,
    });
  } catch {
    res.status(500).json({
      status: "failed",
      message: "server error, try again",
    });
  }
};

module.exports = {
  currentUser,
};
