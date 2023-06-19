const createJsonError = require("../../errors/createJsonError");
const { getExerciseById } = require("../../repositories/exerciseRepository");
const {
  addLike,
  allLikesByWorkoutAndUser,
  getWorkoutsWithLikesCount,
} = require("../../repositories/likesRepository");

const addLikeWorkout = async (req, res) => {
  try {
    const { workout_id } = req.params;
    const { id: idUsuario } = req.auth;
    const likeExists = await allLikesByWorkoutAndUser(workout_id, idUsuario);
    const likesCounter = await getWorkoutsWithLikesCount(idUsuario);

    const workoutExists = await getExerciseById(workout_id);

    if (likeExists) {
      return res
        .status(409)
        .json({ error: "Este usuario ya ha dado like al ejercicio." });
    }

    if (!workoutExists) {
      return res.status(400).json({ error: "Este ejercicio no existe" });
    }

    await addLike(idUsuario, workout_id);

    res.status(200);
    res.send({ likesCounter, message: "Like añadido correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = addLikeWorkout;
