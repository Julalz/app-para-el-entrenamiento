const createJsonError = require("../../errors/createJsonError");
const { getExerciseById } = require("../../repositories/exerciseRepository");
const {
  removeLike,
  updateLikesCount,
  getLikeByWorkoutAndUser,
} = require("../../repositories/likesRepository");

const removeLikeWorkout = async (req, res) => {
  try {
    const { workout_id } = req.params;
    const { user_id } = req.body;

    const likeExists = await getLikeByWorkoutAndUser(workout_id, user_id);
    const workoutExists = await getExerciseById(workout_id);

    if (!likeExists) {
      return res.status(400).json({
        error: "No ha sido posible eliminar el like porque este no existe",
      });
    }

    if (!workoutExists) {
      return res.status(400).json({ error: "Este ejercicio no existe" });
    }

    await removeLike(user_id, workout_id);
    await updateLikesCount(workout_id);

    res.status(200);
    res.send({ message: "Like eliminado correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = removeLikeWorkout;
