const Joi = require("joi");
const { addExercise } = require("../../repositories/exerciseRepository");
const isAdmin = require("../../middlewares/validAdmin");
const createJsonError = require("../../errors/createJsonError");

const schema = Joi.object().keys({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(220).required(),
  image: Joi.string(),
  typology: Joi.string().min(2).max(220).required(),
  muscle: Joi.string().min(2).max(220).required(),
});

const createExercise = async (req, res) => {
  try {
    const { body } = req;
    await schema.validateAsync(body);

    const exerciseId = await addExercise(body);

    res.status(201);
    res.send("Ejercicio creado satisfactoriamente");
    console.log(exerciseId);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = createExercise;
