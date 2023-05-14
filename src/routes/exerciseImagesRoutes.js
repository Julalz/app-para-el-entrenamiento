const express = require("express");
const validAdmin = require("../middlewares/validAdmin");
const {
  deleteExerciseImageById,
} = require("../repositories/exerciseImagesRepository");

const exerciseImagesRoutes = express.Router();

exerciseImagesRoutes
  .route("/:id")
  .all(validAdmin)
  .delete(deleteExerciseImageById);

module.exports = exerciseImagesRoutes;
