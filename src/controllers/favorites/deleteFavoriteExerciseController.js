const createJsonError = require("../../errors/createJsonError");
const {
  removeExerciseFromFavoritesByid,
} = require("../../repositories/favoritesRepository");

const removeExerciseFavorites = async (req, res) => {
  try {
    const { id } = req.body;

    await removeExerciseFromFavoritesByid(id);

    res.status(200);
    res.send({ message: "Ejercicio eliminado de favoritos correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = removeExerciseFavorites;
