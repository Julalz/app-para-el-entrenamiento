const getPool = require("../infrastructure/database");

const addExerciseToFavorites = async (user_id, workout_id) => {
  const pool = await getPool();
  const sql = `INSERT INTO favorites (
      user_id,
      workout_id
    ) VALUES (?, ?)`;

  const [createdFav] = await pool.query(sql, [user_id, workout_id]);

  return createdFav.insertId;
};

const getAllFavoritesExercise = async (userId) => {
  const pool = await getPool();
  const sql = "SELECT * FROM favorites WHERE user_id = ?";
  const [FavExercises] = await pool.query(sql, [userId]);
  return FavExercises;
};

const removeExerciseFromFavoritesByid = async (id) => {
  const pool = await getPool();
  const sql = "DELETE FROM favorites WHERE id = ?";
  const [deleteFav] = await pool.query(sql, [id]);

  return deleteFav;
};

module.exports = {
  getAllFavoritesExercise,
  addExerciseToFavorites,
  removeExerciseFromFavoritesByid,
};
