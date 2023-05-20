const Joi = require("joi");
const isAdmin = require("../../helpers/utils");
const { findExerciseById } = require("../../repositories/exerciseRepository");
const throwJsonError = require("../../errors/throwJsonError");
const uploadImage = require("../../helpers/uploadImage");
const {
  addImagesByIdExercise,
} = require("../../repositories/exerciseImagesRepository");
const createJsonError = require("../../errors/createJsonError");

const schema = Joi.number().positive().integer().required();
const schemaFiles = Joi.object().keys({
  imagesExercise: Joi.required(),
});

const uploadMultipleExerciseImagesById = async (req, res) => {
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

    const { files } = req;
    // if (!files) //seria suficiente
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No ha seleccionado ningún fichero");
    }
    await schemaFiles.validateAsync(files);

    const { imagesExercise } = files;

    //console.log(imagesExercise);
    //Promise.allSettled -- espera por el resto de las
    const uploadImages = await Promise.all(
      imagesExercise.map(async (imgExercise) => {
        const { data } = imgExercise;
        const randomName = await uploadImage(id, data);

        await addImagesByIdExercise(id, randomName, 0);

        return { image: `${HTTP_BACKEND}/exercises/${id}/${randomName}` };
      })
    );

    res.status(201);
    res.send({ uploadImages });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadMultipleExerciseImagesById;
