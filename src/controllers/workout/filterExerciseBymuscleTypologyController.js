const {
  findAllExercisesByTypology,
  findAllExerciseByMuscle,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../middlewares/validAdmin");
const throwJsonError = require("../../errors/throwJsonError");

const filterExercises = async (req, res) => {
  try {
    const { muscle, typology } = req.params;
    console.log(req.params);
    const { role } = req.auth;
    isAdmin(role);

    let exercises;
    if (typology) {
      exercises = await findAllExercisesByTypology(typology);
    } else if (muscle) {
      exercises = await findAllExerciseByMuscle(muscle);
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
