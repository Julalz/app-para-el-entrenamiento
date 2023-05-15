const express = require("express");
const validAdmin = require("../middlewares/validAdmin");
const {
  deleteExerciseImageById,
} = require("../repositories/exerciseImagesRepository");
const getExerciseImagesById = require("../controllers/workout/getExerciseImageByIdController");
const uploadExerciseImageById = require("../controllers/workout/uploadExerciseImagesByIdController");
const uploadMultipleExerciseImagesById = require("../controllers/workout/uploadMultipleExerciseImagesByIdController");

const exerciseImagesRoutes = express.Router();

exerciseImagesRoutes
  .route("/:exerciseId")
  .all(validAdmin)
  .get(getExerciseImagesById)
  .delete(deleteExerciseImageById);
exerciseImagesRoutes
  .route("/:id/upload")
  .all(validAdmin)
  .post(uploadExerciseImageById);
exerciseImagesRoutes
  .route("/:id/multiple-upload")
  .all(validAdmin)
  .post(uploadMultipleExerciseImagesById);

module.exports = exerciseImagesRoutes;
