const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { addExercise } = require("../../repositories/exerciseRepository");
const isAdmin = require("../../helpers/adminVerified");

const schema = Joi.object().keys({
  name: Joi.string().min(1).max(60).required(),
  description: Joi.string().min(1).max(255).required(),
  image: Joi.string().min(1).max(255),
  typology: Joi.string().min(1).max(60).required(),
  muscle: Joi.string().min(1).max(60).required(),
});

const createExercise = async (req, res) => {
  try {
    // const { role } = req.auth;
    // isAdmin(role);

    const { body } = req;
    await schema.validateAsync(body);

    const exerciseId = await addExercise(body);

    res.status(201);
    res.send({ message: `Exercise ${exerciseId} created successfully. ` });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = createExercise;
