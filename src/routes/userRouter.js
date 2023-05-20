"use strict";
const express = require("express");
const createAccount = require("../controllers/users/createAccountController");
const loginUser = require("../controllers/users/loginUserController");
const { userProfile } = require("../controllers/users/profileController");
const getUserExerciseFavorites = require("../controllers/favorites/getFavoriteExerciseController");
const addExerciseFavorites = require("../controllers/favorites/addFavoriteExerciseController");
const activationAccount = require("../controllers/users/accountActivation");
const validAuth = require("../middlewares/validAuth");
const removeExerciseFavorites = require("../controllers/favorites/deleteFavoriteExerciseController");
const userRouter = express.Router();

userRouter.route("/signup").post(createAccount);
userRouter.route("/activation/:code").get(activationAccount);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").all(validAuth).get(userProfile);
userRouter
  .route("/profile/:userId/favorites")
  .all(validAuth)
  .get(getUserExerciseFavorites)
  .post(addExerciseFavorites)
  .delete(removeExerciseFavorites);

module.exports = userRouter;
