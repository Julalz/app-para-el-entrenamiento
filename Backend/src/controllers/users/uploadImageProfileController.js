const Joi = require("joi");
const fs = require("fs").promises;

const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findUserByEmail,
  uploadUserProfileImage,
} = require("../../repositories/usersRepository");
const { isAdmin } = require("../../helpers/utils");
const uploadImage = require("../../helpers/uploadImage");
const { findExerciseById } = require("../../repositories/exerciseRepository");

const schemaFiles = Joi.object()
  .keys({ image: Joi.required() })
  .messages({ "object.base": "la imagen es obligatoria" });

const uploadImageProfile = async (req, res) => {
  try {
    const { id, role } = req.auth;
    console.log(req.auth);
    const { files } = req;
    isAdmin(role);

    if (!files) {
      throwJsonError(400, "No se ha seleccionado fichero");
    }
    await schemaFiles.validateAsync(files);

    req.body.image = await uploadImage(req.files.image.data);

    const imageUpdated = await uploadUserProfileImage(id, image);

    res.status(200);
    res.send({
      data: imageUpdated,
      url: `${HTTP_BACKEND}/avatars/${imageName}`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadImageProfile;
