const createJsonError = require("../../errors/createJsonError");
const { getExerciseById } = require("../../repositories/exerciseRepository");
const {
  removeLike,
  allLikesByWorkoutAndUser,
  getWorkoutsWithLikesCount,
} = require("../../repositories/likesRepository");

const removeLikeWorkout = async (req, res) => {
  try {
    const { workout_id } = req.params;
    const { id: idUsuario } = req.auth;
    console.log(req.auth);
    console.log(idUsuario);

    const likeExists = await allLikesByWorkoutAndUser(workout_id, idUsuario);
    const workoutExists = await getExerciseById(workout_id);
    const likesCounter = await getWorkoutsWithLikesCount(idUsuario);
    console.log(likesCounter, "counterlikes");

    if (!likeExists) {
      return res.status(400).json({
        error: `No ha sido posible eliminar  el like ${workout_id}, porque este no existe`,
      });
    }

    if (!workoutExists) {
      return res
        .status(400)
        .json({ error: `Este ${workout_id} ejercicio no existe` });
    }

    await removeLike(idUsuario, workout_id);

    res.status(200);
    res.send({
      likesCounter,
      message: `Este ejercicio numero ${workout_id} se ha eliminado correctamente`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = removeLikeWorkout;
