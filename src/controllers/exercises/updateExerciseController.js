"use strict";

const createJsonError = require("../../errors/createJsonError");

const updateExercise = async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const { name, description, image, typology, muscle } = req.body;

    const updatedExercise = await updateExerciseById(exerciseId, {
      name,
      description,
      image,
      typology,
      muscle,
    });
    res.status(200);
    res.send(updatedExercise);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateExercise;
