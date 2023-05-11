"use strict";

const throwJsonError = require("../../errors/throwJsonError");
const findExerciseById = require("../../repositories/exerciseRepository");

const createExercise = async (req, res) => {
  try {
    const exercise = new findExerciseById({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      typology: req.body.typology,
      muscle: req.body.muscle,
    });

    const savedExercise = await exercise.save();
    res.status(201);
    res.send({ exercise: savedExercise });
  } catch (error) {
    throwJsonError;
  }
};

module.exports = createExercise;
