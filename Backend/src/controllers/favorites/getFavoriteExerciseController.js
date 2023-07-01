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
    favoritesExercises.map((exercise) => {
      const url = `${HTTP_SERVER}images/${exercise.image}`;
      exercise.imageUrl = url;
    });

    res.status(200);
    res.send({ data: favoritesExercises });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getUserExerciseFavorites;
