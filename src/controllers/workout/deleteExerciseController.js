const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  removeExerciseId,
  findExerciseById,
} = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { isAdmin } = require("../../helpers/utils");

const schema = Joi.number().integer().positive().required();

const deleteExerciseById = async (req, res) => {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const exercise = await findExerciseById(id);
    const { id } = req.params;
    await schema.validateAsync(id);
    if (!exercise) {
      throwJsonError(400, "Ejercicio no existente");
    }

    await removeExerciseId(id);

    res.status(200);
    res.send({ message: "Ejercicio eliminado correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExerciseById;
