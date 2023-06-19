const Joi = require("joi");
const {
  findExerciseById,
  updateExerciseById,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");
const { isAdmin } = require("../../helpers/utils");
const uploadImage = require("../../helpers/uploadImage");
const deleteImg = require("../../helpers/deleteImages");

const schema = Joi.object().keys({
  name: Joi.string().min(2).max(20),
  description: Joi.string().min(2).max(220),
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

    if (req.files?.image) {
      exercise.image && deleteImg(exercise.image);
      req.body.image = await uploadImage(req.files.image.data);
    }

    await updateExerciseById(id, body);

    const updateExercise = await findExerciseById(id);

    res.status(200);
    res.send({
      message: `Ejercicio ${id} actualizado correctamente`,
      exercise: updateExercise,
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateExercise;
