"use strict";
const express = require("express");
const createAccount = require("../controllers/users/createAccountController");
const userRouter = express.Router();

userRouter.route("/login").post(createAccount);

module.exports = userRouter;
