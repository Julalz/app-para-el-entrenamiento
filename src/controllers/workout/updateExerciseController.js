// const Joi = require("joi");
// const { updateExerciseById } = require("../../repositories/exerciseRepository");
// const isAdmin = require("../../middlewares/validAdmin");
// const createJsonError = require("../../errors/createJsonError");

// const schema = Joi.object({
//   name: Joi.string().min(2).max(20),
//   description: Joi.string().min(2).max(220),
//   image: Joi.string(),
//   typology: Joi.string().min(2).max(220),
//   muscle: Joi.string().min(2).max(220),
// });

// const updateExercise = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { body } = req;
//     await schema.validateAsync(body);

//     const { role } = req.auth;
//     isAdmin(role);

//     await updateExerciseById(id, body);

//     res.status(200);
//     res.send({ message: `Ejercicio ${id} actualizado correctamente` });
//   } catch (error) {
//     createJsonError(error, res);
//   }
// };

// module.exports = updateExercise;
