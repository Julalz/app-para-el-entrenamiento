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
  const sql =
    "SELECT w.* FROM favorites f INNER JOIN workout w ON f.workout_id = w.id WHERE f.user_id = ?";
  const [favExercises] = await pool.query(sql, [userId]);
  return favExercises;
};
const getFavoriteByWorkoutAndUser = async (workoutId, userId) => {
  const pool = await getPool();
  const sql = `SELECT * FROM favorites WHERE workout_id = ? AND user_id = ?`;
  const [[favorite]] = await pool.query(sql, [workoutId, userId]);

  return favorite;
};

const removeFavoriteByWorkoutAndUser = async (workoutId, userId) => {
  const pool = await getPool();
  const sql = "DELETE FROM favorites WHERE workout_id = ? AND user_id = ?";
  const [deleteFav] = await pool.query(sql, [workoutId, userId]);

  return deleteFav;
};

module.exports = {
  getAllFavoritesExercise,
  addExerciseToFavorites,
  removeFavoriteByWorkoutAndUser,
  getFavoriteByWorkoutAndUser,
};
