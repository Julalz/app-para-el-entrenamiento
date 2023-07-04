const {
  findAllExercisesByTypology,
  findAllExerciseByMuscle,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");

const filterExercises = async (req, res) => {
  try {
    const { muscle, typology } = req.params;
    const { HTTP_SERVER } = process.env;
    console.log(req.params);

    let exercise;
    if (typology) {
      exercises = await findAllExercisesByTypology(typology);
    } else if (muscle) {
      exercises = await findAllExerciseByMuscle(muscle);
      console.log(exercise);
      exercises.map((exercise) => {
        const url = `${HTTP_SERVER}images/${exercise.image}`;
        exercise.imageUrl = url;
      });
    } else {
      throwJsonError(400, "Ejercicio no existente");
    }

    res.status(200);
    res.send(exercises);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = filterExercises;
