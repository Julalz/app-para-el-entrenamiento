const createJsonError = require("../../errors/createJsonError");
const { getExerciseById } = require("../../repositories/exerciseRepository");
const {
  addLike,
  updateLikesCount,
  getLikeByWorkoutAndUser,
} = require("../../repositories/likesRepository");

const addLikeWorkout = async (req, res) => {
  try {
    const { workout_id } = req.params;
    console.log(req.params);
    const { user_id } = req.body;
    console.log(user_id);

    const likeExists = await getLikeByWorkoutAndUser(workout_id, user_id);
    const workoutExists = await getExerciseById(workout_id);

    if (likeExists) {
      return res
        .status(409)
        .json({ error: "Este usuario ya ha dado like al ejercicio." });
    }

    if (!workoutExists) {
      return res.status(400).json({ error: "Este ejercicio no existe" });
    }

    await addLike(user_id, workout_id);
    await updateLikesCount(workout_id);

    res.status(200);
    res.send({ message: "Like añadido correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = addLikeWorkout;
