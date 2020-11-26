const mongoose = require("mongoose");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRD_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      newUser,
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(401).json({
        status: "Failed",
        message: "please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    //const correct = await bcrypt.compare(password, user.password);

    if (!user || !(await bcrypt.compare(password, user.password))) {
     return res.status(400).json({
        status: "Failed",
        message: "please LogIn with correct email and password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRD_IN,
    });

    res.status(200).json({
      status: "Log In success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      err,
    });
  }
};
