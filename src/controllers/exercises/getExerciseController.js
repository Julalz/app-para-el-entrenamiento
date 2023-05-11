"use strict";

const createJsonError = require("../../errors/createJsonError");
const findExerciseById = require("../../repositories/exerciseRepository");

const getExercises = async (req, res) => {
  try {
    const exercise = await findExerciseById;
    res.status(200);
    res.send(exercise);
  } catch (error) {
    createJsonError;
  }
};

module.exports = getExercises;
