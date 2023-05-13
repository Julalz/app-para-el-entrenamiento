const Joi = require("joi");
const {
  findAllExerciseByMuscle,
  findExerciseById,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");

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
    const exercise = await findExerciseById(id);

    if (!exercise) {
      createJsonError({ status: 404, message: "El ejercicio no existe" }, res);
      return;
    }

    const { body } = req;
    await schema.validateAsync(body);

    await updateExercise(id, body);

    res.status(200);
    res.send("Ejercicio actualizado satisfactoriamente");
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateExercise;
