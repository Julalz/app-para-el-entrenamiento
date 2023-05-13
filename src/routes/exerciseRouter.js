"use strict";
const express = require("express");
const validAdmin = require("../middlewares/validAdmin");
const createExercise = require("../controllers/workout/createExerciseController");
const getAllExercise = require("../controllers/workout/getAllExerciseController");
const deleteExerciseById = require("../controllers/workout/deleteExerciseController");
const addLikeWorkout = require("../controllers/workout/addLikeExerciseController");
const removeLikeWorkout = require("../controllers/workout/removeLikeExerciseController");
const exerciseRouter = express.Router();

exerciseRouter.route("/").all(validAdmin).post(createExercise);
exerciseRouter.route("/getall").get(getAllExercise);
exerciseRouter.route("/:id").all(validAdmin).delete(deleteExerciseById);
exerciseRouter
  .route("/like/:workoutId")
  .all(validAdmin)
  .post(addLikeWorkout)
  .delete(removeLikeWorkout);

module.exports = exerciseRouter;
