const {
  findAllExercisesByTypology,
  findAllExerciseByMuscle,
} = require("../../repositories/exerciseRepository");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");

const { findUserByEmail } = require("../../repositories/usersRepository");

const {
  getAllFavoritesExercise,
} = require("../../repositories/favoritesRepository");


const filterExercises = async (req, res) => {
  try {
    const { id: userId } = req.auth;
    const { muscle, typology } = req.params;
    const { HTTP_SERVER } = process.env;
    // console.log(req.params);

    let exercises;
    if (typology) {
      exercises = await findAllExercisesByTypology(typology);
    } else if (muscle) {
      exercises = await findAllExerciseByMuscle(muscle);

      exercises.map((exercise) => {
        const url = `${HTTP_SERVER}images/${exercise.image}`;
        exercise.imageUrl = url;
      });

      const isFavorite = await getAllFavoritesExercise(userId);
      exercises.forEach((exercise) => {
        const favoriteByLoggedUser = isFavorite.find(
          (favorite) => favorite.id === exercise.id
        );
        exercise.favoriteByLoggedUser = favoriteByLoggedUser
          ? favoriteByLoggedUser.favoriteByLoggedUser
          : 0;
      });
    } else {
      throwJsonError(400, "Ejercicio no existente");
    }

    res.status(200);
    res.send(exercises);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = filterExercises;
