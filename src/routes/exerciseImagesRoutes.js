const express = require("express");
const getExerciseImagesById = require("../controllers/workout/getExerciseImageByIdController");
const uploadExerciseImageById = require("../controllers/workout/uploadExerciseImagesByIdController");
const uploadMultipleExerciseImagesById = require("../controllers/workout/uploadMultipleExerciseImagesByIdController");
const validAuth = require("../middlewares/validAuth");
const deleteExerciseImageByImageId = require("../controllers/workout/deleteExerciseImageById");

const exerciseImagesRoutes = express.Router();

exerciseImagesRoutes
  .route("/:id")
  .all(validAuth)
  .get(getExerciseImagesById)
  .delete(deleteExerciseImageByImageId);
exerciseImagesRoutes
  .route("/:id/uplaod")
  .all(validAuth)
  .post(uploadExerciseImageById);
exerciseImagesRoutes
  .route("/:id/multiple-upload")
  .all(validAuth)
  .post(uploadMultipleExerciseImagesById);

module.exports = exerciseImagesRoutes;
