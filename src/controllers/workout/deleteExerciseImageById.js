const Joi = require("joi");
const path = require("path");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { isAdmin } = require("../../helpers/utils");
const {
  deleteExerciseImageById,
} = require("../../repositories/exerciseImagesRepository");

const deleteImg = require("../../helpers/deleteImages");
const {
  findAllExercise,
  deleteExerciseImageFromWorkoutById,
  getWorkoutImageById,
} = require("../../repositories/exerciseRepository");

const schema = Joi.number().positive().integer().required();

const deleteExerciseImageByImageId = async (req, res) => {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    console.log(req.params, "params");
    await schema.validateAsync(id);

    const imageExercisesFromAllExercise = await findAllExercise(id);
    // if (imageExercisesFromAllExercise.length === 0) {
    //   throwJsonError(400, "Ejercicio no existe");
    // }

    imageExercisesFromAllExercise.forEach((exercise) => {
      const exerciseId = exercise?.id;
      const image = exercise?.image;
      if (!image || !exerciseId) {
        throwJsonError(400, "La imagen o el ejercicio no existen");
      }
    });

    const exerciseImage = imageExercisesFromAllExercise[0];
    const exerciseImagePath = path.join(
      __dirname,
      "../../../public/images",
      exerciseImage.id.toString(),
      exerciseImage.image
    );

    const workoutImage = await getWorkoutImageById(exerciseImage.id);
    const workoutImagePath = path.join(
      __dirname,
      "../../../public/workout",
      workoutImage
    );

    console.log(exerciseImagePath, "local");
    console.log(workoutImagePath, "workoutTable");

    await deleteExerciseImageById(id);
    await deleteExerciseImageFromWorkoutById(id);
    console.log(imgPath);
    await deleteImg(imgPath);

    res.status(200);
    res.send({ message: `Imagen del ejercicio ${id} eliminada` });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExerciseImageByImageId;
