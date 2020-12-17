const mongoose = require("mongoose");
const { promisify } = require("util");
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
      expiresIn: process.env.JWT_EXPIRED_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      message: `Successfully added ${newUser.name} to users list`,
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
        status: false,
        message: "please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    //const correct = await bcrypt.compare(password, user.password);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: false,
        message: "please LogIn with correct email and password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });

    res.status(200).json({
      status: true,
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "Login failed",
    });
  }
};

exports.authenticated = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    //console.log(token);
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "please logIn first",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const newUser = await User.findById(decoded.id);
    if (!newUser) throw "This Id no longer exists";

    next();
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      messages: "Invalid token",
      err,
    });
  }
};
