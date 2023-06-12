const Joi = require("joi");
const {
  findExerciseById,
  findAllExercise,
  updateExerciseImagesByIdWorkout,
} = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");
const {
  AddImageToExerciseTable,
} = require("../../repositories/exerciseImagesRepository");
const createJsonError = require("../../errors/createJsonError");
const { isAdmin } = require("../../helpers/utils");
const uploadImage = require("../../helpers/uploadImage");

const schema = Joi.number().positive().integer().required();
const schemaBody = Joi.boolean();
const schemaFiles = Joi.object().keys({
  imageExercise: Joi.required(),
});

const uploadExerciseImageById = async (req, res) => {
  try {
    const { HTTP_SERVER } = process.env;
    const { id } = req.params;
    console.log(id, "idExcercise");

    await schema.validateAsync(id);
    const { role, email } = req.auth;
    isAdmin(role, email);

    const exercise = await findExerciseById(id);
    if (!exercise) {
      throwJsonError(400, "No existe el ejercicio");
    }

    const { principal } = req.body;
    await schemaBody.validateAsync(principal);

    const { files } = req;
    console.log(files);

    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No ha seleccionado ningún fichero");
    }
    await schemaFiles.validateAsync(files);

    const { imageExercise } = files;

    if (!imageExercise.mimetype.startsWith("image")) {
      throwJsonError(400, "Formato no válido");
    }

    const randomName = await uploadImage(id, imageExercise.data);

    if (principal === "1") {
      await removePrincipalByExerciseId(id);
    }

    const imageWorkout = await updateExerciseImagesByIdWorkout(id, randomName);
    const imageTabla = await AddImageToExerciseTable(randomName, principal, id);
    console.log(imageWorkout, imageTabla, "imagenes");

    res.status(201);
    res.send({ image: `${HTTP_SERVER}/images/${id}/${randomName}` });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadExerciseImageById;
