"use strict";
const express = require("express");
const validAdmin = require("../middlewares/validAdmin");
const createExercise = require("../controllers/workout/createExerciseController");
const getAllExercise = require("../controllers/workout/getAllExerciseController");
const deleteExerciseById = require("../controllers/workout/deleteExerciseController");
const { updateExerciseById } = require("../repositories/exerciseRepository");
const filterExercises = require("../controllers/workout/filterExerciseBymuscleTypologyController");

const exerciseRouter = express.Router();

exerciseRouter.route("/").all(validAdmin).post(createExercise);
exerciseRouter.route("/getall").get(getAllExercise);
exerciseRouter.route("/:id").all(validAdmin).delete(deleteExerciseById);
exerciseRouter.route("/:id").all(validAdmin).put(updateExerciseById);
exerciseRouter.route("/muscle/:muscle").all(validAdmin).get(filterExercises);
exerciseRouter
  .route("/typology/:typology")
  .all(validAdmin)
  .get(filterExercises);

module.exports = exerciseRouter;
