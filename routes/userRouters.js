const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/").get(userController.getAlluser).post(userController.createUser);

module.exports = router;
