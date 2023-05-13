"use strict";
const express = require("express");
const validAdmin = require("../middlewares/validAdmin");
const createExercise = require("../controllers/workout/createExerciseController");
const deleteExerciseById = require("../controllers/workout/deleteExerciseController");
const getAllExercise = require("../controllers/workout/getAllExercisesController");
const { updateExercise } = require("../repositories/exerciseRepository");

const exerciseRouter = express.Router();

exerciseRouter.route("/").all(validAdmin).post(createExercise);
exerciseRouter.route("/getall").get(getAllExercise);
exerciseRouter.route("/:id").all(validAdmin).delete(deleteExerciseById);
exerciseRouter.route("/update").all(validAdmin).patch(updateExercise);

module.exports = exerciseRouter;
