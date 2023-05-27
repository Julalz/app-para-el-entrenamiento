const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");

const {
  addExerciseToFavorites,
} = require("../../repositories/favoritesRepository");

const addExerciseFavorites = async (req, res) => {
  try {
    const { workout_id } = req.body;

    const { userId } = req.params;

    const { id } = req.auth;

    if (id !== +userId) {
      throwJsonError(403, "usuario incorrecto");
    }

    const ResponseFavoritesExercise = await addExerciseToFavorites(
      id,
      workout_id
    );

    res.status(201);
    res.send({
      message: "Ejercicio agregado a favoritos correctamente",
      favoriteId: ResponseFavoritesExercise,
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = addExerciseFavorites;
