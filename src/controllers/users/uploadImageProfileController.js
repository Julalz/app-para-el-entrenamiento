const path = require("path");
const fs = require("fs").promises;
const randomstring = require("randomstring");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findUserByEmail,
  uploadUserProfileImage,
} = require("../../repositories/usersRepository");

const validExtension = [".jpeg", ".jpg", ".png"];

const uploadImageProfile = async (req, res) => {
  try {
    // Obtenemos el email del JWT
    const { email } = req.auth;
    const { files } = req;
    if (!files) {
      throwJsonError(400, "No se ha seleccionado fichero");
    }

    const { avatar } = files;
    const extension = path.extname(avatar.name);

    const { HTTP_BACKEND } = process.env;

    if (!validExtension.includes(extension)) {
      throwJsonError(400, "Formato no válido");
    }

    const user = await findUserByEmail(email);
    const { id, image } = user;

    // Generamos la ruta completa de la carpeta donde situamos la image.
    const pathAvatar = path.join(__dirname, "/../../../public/avatars");

    //Borrar imagen inicial si existe
    if (image) {
      await fs.unlink(`${pathAvatar}/${image}`);
    }

    const random = randomstring.generate(10);
    const imageName = `${id}-${random}${extension}`;
    const pathImage = `${pathAvatar}/${imageName}`;

    avatar.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      // Guardamos nombre imagen en base datos.
      await uploadUserProfileImage(id, imageName);

      res.send({ url: `${HTTP_BACKEND}/avatars/${imageName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadImageProfile;
