const createJsonError = require("../../errors/createJsonError");

const {
  getAllFavoritesExercise,
} = require("../../repositories/favoritesRepository");

const getUserExerciseFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const responseFavoritesExercise = await getAllFavoritesExercise(userId);

    res.status(200);
    res.send(responseFavoritesExercise);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getUserExerciseFavorites;
