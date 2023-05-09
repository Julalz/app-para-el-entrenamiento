"use strict";
const express = require("express");
const createExercise = require("../controllers/exercises/createExerciseController");
const getExercises = require("../controllers/exercises/getExercisesController");

const exerciseRouter = express.Router();

//Endpoint privado
exerciseRouter.route("/").post(createExercise);
exerciseRouter.route("/").get(getExercises);

module.exports = exerciseRouter;
