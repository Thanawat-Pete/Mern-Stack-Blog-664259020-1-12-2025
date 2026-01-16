const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const UserController = require("../controllers/user.controller");

//loaclhost:5000/api/v1/user/register
router.post("/register", UserController.registerUser);
//loaclhost:5000/api/v1/user/login
router.post("/login", UserController.loginUser);

module.exports = router;
