"use strict";
const express = require("express");
const createAccount = require("../controllers/users/createAccountController");
const loginUser = require("../controllers/users/loginUserController");
const userRouter = express.Router();

userRouter.route("/signup").post(createAccount);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;
