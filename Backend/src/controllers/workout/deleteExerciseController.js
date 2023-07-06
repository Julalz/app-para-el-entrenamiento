const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  removeExerciseId,
  findExerciseById,
} = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { isAdmin } = require("../../helpers/utils");
const deleteImg = require("../../helpers/deleteImages");
const {
  removeExerciseFromFavorites,
} = require("../../repositories/favoritesRepository");

const schema = Joi.number().integer().positive().required();

const deleteExerciseById = async (req, res) => {
  try {
    const { role } = req.auth;
    isAdmin(role);
    const { id } = req.params;
    const exercise = await findExerciseById(id);

    await schema.validateAsync(id);
    if (!exercise) {
      throwJsonError(400, "Ejercicio no existente");
    }

    await removeExerciseFromFavorites(id);

    await removeExerciseId(id);
    deleteImg(exercise.image);

    res.status(200);
    res.send({ message: "Ejercicio eliminado correctamente", data: exercise });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExerciseById;
