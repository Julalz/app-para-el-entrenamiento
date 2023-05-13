const createJsonError = require("../../errors/createJsonError");
const validAdmin = require("../../middlewares/validAdmin");
const { getExerciseById } = require("../../repositories/exerciseRepository");
const {
  removeLike,
  updateLikesCount,
  getLikeByWorkoutAndUser,
} = require("../../repositories/likesRepository");

const removeLikeWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { userId } = req.body;

    const likeExists = await getLikeByWorkoutAndUser(workoutId, userId);
    const workoutExists = await getExerciseById(workoutId);

    if (!likeExists) {
      return res.status(400).json({
        error: "No ha sido posible eliminar el like porque este no existe",
      });
    }

    if (!workoutExists) {
      return res.status(400).json({ error: "Este ejercicio no existe" });
    }

    await removeLike(userId, workoutId);
    await updateLikesCount(workoutId);

    res.status(200);
    res.send({ message: "Like eliminado correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = removeLikeWorkout;
