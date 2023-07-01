const Joi = require("joi");
const {
  addExercise,
  findExerciseById,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");
const { isAdmin } = require("../../helpers/utils");
const uploadImage = require("../../helpers/uploadImage");
// const {
//   default: Button,
// } = require("../../../../Frontend/fit-xtreme/src/components/shared/button/Button");

const schema = Joi.object().keys({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(2).max(500).required(),
  typology: Joi.string().min(2).max(220).required(),
  muscle: Joi.string().min(2).max(220).required(),
});
const schemaFiles = Joi.object()
  .keys({
    image: Joi.required(),
  })
  .messages({ "object.base": "La imagen es obligatoria" });
const createExercise = async (req, res) => {
  try {
    const { body, files } = req;
    const { role } = req.auth;
    console.log(body, files);
    isAdmin(role);
    await schema.validateAsync(body);
    await schemaFiles.validateAsync(files);

    req.body.image = await uploadImage(req.files.image.data);

    const exerciseId = await addExercise(body);
    const createdExercise = await findExerciseById(exerciseId);

    res.status(201);
    res.send({ message: "Ejercicio creado", data: createdExercise });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = createExercise;
