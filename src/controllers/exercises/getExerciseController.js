"use strict";

const createJsonError = require("../../errors/createJsonError");
const findExerciseById = require("../../repositories/exerciseRepository");

const getExercises = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await findExerciseById(exerciseId);
    res.status(200);
    res.send(exercise);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getExercises;
