"use strict";
const express = require("express");
const createExercise = require("../controllers/workout/createExerciseController");
const { updateExerciseById } = require("../repositories/exerciseRepository");
const filterExercises = require("../controllers/workout/filterExerciseBymuscleTypologyController");
const deleteExerciseById = require("../controllers/workout/deleteExerciseController");
const addLikeWorkout = require("../controllers/workout/addLikeExerciseController");
const removeLikeWorkout = require("../controllers/workout/removeLikeExerciseController");
const updateExercise = require("../controllers/workout/updateExerciseController");
const getAllExercise = require("../controllers/workout/getAllExercisesController");

const validAuth = require("../middlewares/validAuth");

const exerciseRouter = express.Router();

exerciseRouter.route("/").all(validAuth).post(createExercise);
exerciseRouter.route("/getall").all(validAuth).get(getAllExercise);
exerciseRouter
  .route("/like/:workout_id")
  .all(validAuth)
  .post(addLikeWorkout)
  .delete(removeLikeWorkout);
exerciseRouter
  .route("/:id")
  .all(validAuth)
  .put(updateExercise)
  .delete(deleteExerciseById);
exerciseRouter.route("/muscle/:muscle").all(validAuth).get(filterExercises);
exerciseRouter.route("/typology/:typology").all(validAuth).get(filterExercises);

module.exports = exerciseRouter;
