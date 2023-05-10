"use strict";
const express = require("express");
const createAccount = require("../controllers/users/createAccountController");
const loginUser = require("../controllers/users/loginUserController");
const validAdmin = require("../middlewares/validAdmin");
const { userProfile } = require("../controllers/users/profileController");
const userRouter = express.Router();

userRouter.route("/signup").post(createAccount);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").all(validAdmin).get(userProfile);

module.exports = userRouter;
