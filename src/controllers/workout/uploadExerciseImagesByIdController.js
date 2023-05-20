const Joi = require("joi");
const { findExerciseById } = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");
const {
  removePrincipalByExerciseId,
  addImagesByIdExercise,
} = require("../../repositories/exerciseImagesRepository");
const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../helpers/utils");
const uploadImage = require("../../helpers/uploadImage");

const schema = Joi.number().positive().integer().required();
const schemaBody = Joi.boolean();
const schemaFiles = Joi.object().keys({
  imageExercise: Joi.required(),
});

const uploadExerciseImageById = async (req, res) => {
  try {
    const { HTTP_BACKEND } = process.env;

    const { id } = req.params;
    // Validamos el id
    await schema.validateAsync(id);
    const { role } = req.auth; // .auth lo hemos definido nosotros así!!!!
    isAdmin(role);

    const exercise = await findExerciseById(id);
    if (!exercise) {
      throwJsonError(400, "No existe el ejercicio");
    }

    const { principal } = req.body;
    await schemaBody.validateAsync(principal);

    // IMAGEN
    console.log(req.files);
    const { files } = req;
    // if (!files) //seria suficiente
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No ha seleccionado ningún fichero");
    }
    await schemaFiles.validateAsync(files);

    const { imageExercise } = files;
    // Validamos formato imagen con el mimetype. Ver en uploadAvatar validacion con extension
    if (!imageExercise.mimetype.startsWith("image")) {
      throwJsonError(400, "Formato no válido");
    }

    /////
    //Procesar/trabajar la imagen
    const randomName = await uploadImage(id, imageExercise.data);
    // FIN Procesado

    if (principal === "1") {
      await removePrincipalByExerciseId(id);
    }
    await addImagesByIdExercise(id, randomName, principal);

    res.status(201);
    res.send({ image: `${HTTP_BACKEND}/exercises/${id}/${randomName}` });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadExerciseImageById;
