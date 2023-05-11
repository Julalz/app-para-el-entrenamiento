const createJsonError = require("../../errors/createJsonError");
const { findAllExercise } = require("../../repositories/exerciseRepository");

async function getAllExercise(req, res) {
  try {
    const Exercise = await findAllExercise();

    res.status(200);
    res.send(Exercise);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAllExercise;
