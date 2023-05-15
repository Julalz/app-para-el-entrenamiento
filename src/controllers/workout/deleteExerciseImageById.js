const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const isAdmin = require("../../helpers/utils");
const {
  findImageById,
} = require("../../repositories/exerciseImagesRepository");

const schema = Joi.number().integer().positive().requires();

const deleteExerciseImageByImageId = async (req, res) => {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schema.validateAsync(id);

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
    console.log(pathImage);

    await deleteExerciseImageByImageId(id, pathImage);

    res.status(200);
    res.send({ message: "Image ejercicio eliminada" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExerciseImageByImageId;
