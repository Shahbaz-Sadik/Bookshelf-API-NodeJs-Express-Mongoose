const mongoose = require("mongoose");
const User = require("./../models/userModel");

exports.getAlluser = async (req, res) => {
  try {
    const allUser = await User.find({}, { _id: 0, __v: 0, password: 0 });

    res.status(200).json({
      status: "succes",
      allUser,
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: "No User found",
    });
  }
};
