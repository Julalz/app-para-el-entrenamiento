const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findExerciseById } = require("../../repositories/exerciseRepository");

const {
  getAllFavoritesExercise,
} = require("../../repositories/favoritesRepository");
const { HTTP_SERVER } = process.env;

const getUserExerciseFavorites = async (req, res) => {
  try {
    const { id: userId } = req.auth;
    console.log(userId, "id usuario");

    const favoritesExercises = await getAllFavoritesExercise(userId);

    const filteredExercises = favoritesExercises.filter(
      (exercise) => exercise.favoriteByLoggedUser === 1
    );

    filteredExercises.forEach((exercise) => {
      const url = `${HTTP_SERVER}images/${exercise.image}`;
      exercise.imageUrl = url;
    });

    res.status(200).json({ data: filteredExercises });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getUserExerciseFavorites;
