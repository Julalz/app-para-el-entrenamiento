const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  removeFavoriteByWorkoutAndUser,
  getFavoriteByWorkoutAndUser,
} = require("../../repositories/favoritesRepository");

const removeExerciseFavorites = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { id: idUserLog } = req.auth;

    const favorite = await getFavoriteByWorkoutAndUser(workoutId, idUserLog);

    if (!favorite) {
      throwJsonError(403, `El ejercicio ${workoutId} no estaba en favoritos`);
    }

    await removeFavoriteByWorkoutAndUser(workoutId, idUserLog);

    res.status(200);
    res.send({ message: "Ejercicio eliminado de favoritos correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = removeExerciseFavorites;
