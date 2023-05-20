const Joi = require("joi");
const path = require("path");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { isAdmin } = require("../../helpers/utils");
const {
  findImageById,
  deleteExerciseImageById,
} = require("../../repositories/exerciseImagesRepository");

const schema = Joi.number().positive().integer().required();

const deleteExerciseImageByImageId = async (req, res) => {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schema.validateAsync(id);
    console.log(id);
    const imageExercise = await findImageById(id);
    if (!imageExercise) {
      throwJsonError(400, "ejercicio no existe");
    }

    const pathImage = path.join(
      __dirname,
      "../../..//public/exercises",
      imageExercise.idExercise.toString(),
      imageExercise.name
    );

    await deleteExerciseImageById(id, pathImage);

    res.status(200);
    res.send({ message: "Imagen del ejercicio eliminada" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExerciseImageByImageId;
