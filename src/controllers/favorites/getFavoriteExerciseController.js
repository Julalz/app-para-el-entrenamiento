const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findExerciseById } = require("../../repositories/exerciseRepository");

const {
  getAllFavoritesExercise,
} = require("../../repositories/favoritesRepository");

const getUserExerciseFavorites = async (req, res) => {
  try {
    const { id: userId } = req.auth;

    const favoritesExercises = await getAllFavoritesExercise(userId);

    res.status(200);
    res.send({ data: favoritesExercises });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getUserExerciseFavorites;
