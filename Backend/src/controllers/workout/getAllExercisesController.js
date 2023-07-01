const createJsonError = require("../../errors/createJsonError");
const { findAllExercise } = require("../../repositories/exerciseRepository");
const { HTTP_SERVER } = process.env;
async function getAllExercise(req, res) {
  try {
    const exercises = await findAllExercise();
    console.log(exercises);
    exercises.map((exercise) => {
      const url = `${HTTP_SERVER}images/${exercise.image}`;
      exercise.imageUrl = url;
    });

    res.status(200);
    res.send({ data: exercises });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAllExercise;
