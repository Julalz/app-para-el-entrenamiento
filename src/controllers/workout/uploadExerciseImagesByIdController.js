const Joi = require("joi");
const {
  findExerciseById,
  updateExerciseImagesById,
} = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");
const {
  removePrincipalByExerciseId,
  addImagesByIdExercise,
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

    console.log(req.params);
    await schema.validateAsync(id);
    const { role } = req.auth;
    isAdmin(role);

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
    // await addImagesByIdExercise(id, randomName, principal);
    await updateExerciseImagesById(id, randomName);

    res.status(201);
    res.send({ image: `${HTTP_SERVER}/images/${id}/${randomName}` });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadExerciseImageById;
