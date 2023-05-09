const { findAllExercises } = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");

const getExercises = async (req, res) => {
  try {
    const exercises = await findAllExercises();

    res.status(200);
    res.send(exercises);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getExercises;
