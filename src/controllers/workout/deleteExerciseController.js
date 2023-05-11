const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const validAdmin = require("../../middlewares/validAdmin");
const {
  findAllExerciseByMuscle,
  removeExerciseId,
} = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");

const schema = Joi.number().integer().positive().required();

const deleteExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);

    const { role } = req.auth;
    validAdmin(role);

    const exercise = await findAllExerciseByMuscle(id);
    if (!exercise) {
      throwJsonError(400, "Ejercicio no existente");
    }
    console.log("exercise", exercise);

    await removeExerciseId(id);

    res.status(200);
    res.send({ message: "Ejercicio eliminado correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExerciseById;
