"use strict";
const express = require("express");
const createAccount = require("../controllers/users/createAccountController");
const loginUser = require("../controllers/users/loginUserController");
const validAdmin = require("../middlewares/validAdmin");
const { userProfile } = require("../controllers/users/profileController");
const getUserExerciseFavorites = require("../controllers/favorites/getFavoriteExerciseController");
const addExerciseFavorites = require("../controllers/favorites/addFavoriteExerciseController");
const userRouter = express.Router();

userRouter.route("/signup").post(createAccount);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").all(validAdmin).get(userProfile);
userRouter
  .route("/profile/:userId/favorites")
  .all(validAdmin)
  .get(getUserExerciseFavorites)
  .post(addExerciseFavorites)
  .delete(addExerciseFavorites);

module.exports = userRouter;
