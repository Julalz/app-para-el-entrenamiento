const express = require("express");
const getExercises = require("../controllers/exercises/getExerciseController");
const createExercise = require("../controllers/exercises/createExerciseController");
const updateExercise = require("../controllers/exercises/updateExerciseController");
const validAdmin = require("../middlewares/validAdmin");
const exerciseRouter = express.Router();

exerciseRouter.route("/").get(getExercises);
exerciseRouter.route("/create").post(createExercise);

module.exports = exerciseRouter;
