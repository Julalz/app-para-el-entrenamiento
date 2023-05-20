"use strict";
const express = require("express");
const createExercise = require("../controllers/workout/createExerciseController");
const getAllExercise = require("../controllers/workout/getAllExerciseController");
const { updateExerciseById } = require("../repositories/exerciseRepository");
const filterExercises = require("../controllers/workout/filterExerciseBymuscleTypologyController");

const updateExercise = require("../controllers/workout/updateExerciseController");
const validAuth = require("../middlewares/validAuth");
const deleteExerciseById = require("../controllers/workout/deleteExerciseController");

const exerciseRouter = express.Router();

exerciseRouter.route("/").all(validAuth).post(createExercise);
exerciseRouter.route("/getall").all(validAuth).get(getAllExercise);
exerciseRouter
  .route("/:id")
  .all(validAuth)
  .put(updateExercise)
  .delete(deleteExerciseById);
exerciseRouter.route("/muscle/:muscle").all(validAuth).get(filterExercises);
exerciseRouter.route("/typology/:typology").all(validAuth).get(filterExercises);

module.exports = exerciseRouter;
