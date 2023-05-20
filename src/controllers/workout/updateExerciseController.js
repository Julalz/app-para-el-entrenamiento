const Joi = require("joi");
const {
  findExerciseById,
  updateExerciseById,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");
const { isAdmin } = require("../../helpers/utils");

const schema = Joi.object().keys({
  name: Joi.string().min(2).max(20),
  description: Joi.string().min(2).max(220),
  image: Joi.string(),
  typology: Joi.string().min(2).max(220),
  muscle: Joi.string().min(2).max(220),
});

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.auth;
    isAdmin(role);
    const exercise = await findExerciseById(id);

    if (!exercise) {
      createJsonError({ status: 404, message: "El ejercicio no existe" }, res);
      return;
    }

    const { body } = req;
    await schema.validateAsync(body);

    await updateExerciseById(id, body);

    res.status(200);
    res.send("Ejercicio actualizado satisfactoriamente");
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateExercise;
