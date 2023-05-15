const createJsonError = require("../../errors/createJsonError");
const validAdmin = require("../../middlewares/validAdmin");
const { getExerciseById } = require("../../repositories/exerciseRepository");
const {
  addLike,
  updateLikesCount,
  getLikeByWorkoutAndUser,
} = require("../../repositories/likesRepository");

const addLikeWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { userId } = req.body;

    const likeExists = await getLikeByWorkoutAndUser(workoutId, userId);
    const workoutExists = await getExerciseById(workoutId);

    if (likeExists) {
      return res
        .status(409)
        .json({ error: "Este usuario ya ha dado like al ejercicio." });
    }

    if (!workoutExists) {
      return res.status(400).json({ error: "Este ejercicio no existe" });
    }

    await addLike(userId, workoutId);
    await updateLikesCount(workoutId);

    res.status(200);
    res.send({ message: "Like añadido correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = addLikeWorkout;
