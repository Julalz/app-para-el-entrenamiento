const createJsonError = require("../../errors/createJsonError");
const { findAllExercise } = require("../../repositories/exerciseRepository");

async function getAllExercise(req, res) {
  try {
    const exercises = await findAllExercise();

    res.status(200);
    res.send({ data: exercises });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAllExercise;
