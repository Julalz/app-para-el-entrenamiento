const Joi = require("joi");
const {
  findAllImagesByIdExercise,
} = require("../../repositories/exerciseImagesRepository");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const { HTTP_BACKEND } = process.env;

const schema = Joi.number().integer().positive().required();

const getExerciseImagesById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    await schema.validateAsync(id);
    const exerciseImages = await findAllImagesByIdExercise(id);
    if (!exerciseImages) {
      throwJsonError(400, "Id no válido");
    }

    const mapperExerciseImages = exerciseImages.map((imgExercise) => {
      const { name, principal } = imgExercise;
      const imgUrl = `${HTTP_BACKEND}/exercises/${id}/${name}`;
      return {
        image: imgUrl,
        principal,
      };
    });
    console.log(mapperExerciseImages);
    res.status(200);
    res.send({ exerciseImages: mapperExerciseImages });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getExerciseImagesById;
