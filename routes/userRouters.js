const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("./../controller/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.route("/").get(userController.getAlluser).post(userController.createUser);

module.exports = router;
