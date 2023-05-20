const createJsonError = require("../../errors/createJsonError");

const {
  addExerciseToFavorites,
} = require("../../repositories/favoritesRepository");

const addExerciseFavorites = async (req, res) => {
  try {
    const { user_id, workout_id } = req.body;
    const { userId } = req.params;

    const ResponseFavoritesExercise = await addExerciseToFavorites(
      userId,
      user_id,
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
