const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");

const {
  addExerciseToFavorites,
  getFavoriteByWorkoutAndUser,
} = require("../../repositories/favoritesRepository");

const addExerciseFavorites = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { id: idUserLog } = req.auth;

    const favorite = await getFavoriteByWorkoutAndUser(workoutId, idUserLog);

    if (favorite) {
      throwJsonError(403, `El ejercicio ${workoutId} ya esta en favoritos`);
    }

    const favoriteId = await addExerciseToFavorites(idUserLog, workoutId);

    res.status(201);
    res.send({
      message: `Ejercicio ${workoutId} agregado a favoritos correctamente`,
      data: { id: favoriteId, workout_id: workoutId, user_id: idUserLog },
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = addExerciseFavorites;
