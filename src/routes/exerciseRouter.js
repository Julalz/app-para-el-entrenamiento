"use strict";
const express = require("express");
const validAdmin = require("../middlewares/validAdmin");
const createExercise = require("../controllers/workout/createExerciseController");
const getAllExercise = require("../controllers/workout/getAllExerciseController");
const deleteExerciseById = require("../controllers/workout/deleteExerciseController");

const exerciseRouter = express.Router();

exerciseRouter.route("/").all(validAdmin).post(createExercise);
exerciseRouter.route("/getall").get(getAllExercise);
exerciseRouter.route("/:id").all(validAdmin).delete(deleteExerciseById);

module.exports = exerciseRouter;
