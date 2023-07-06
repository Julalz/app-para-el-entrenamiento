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
  const sql = `SELECT 
    w.*,
    COUNT(f.id) AS favoritesCount,
    COUNT(DISTINCT f2.id) AS favoriteByLoggedUser 
    FROM 
    workout w 
    LEFT JOIN 
    favorites f ON w.id = f.workout_id 
    LEFT JOIN
     favorites f2 ON w.id = f2.workout_id AND f2.user_id = ? 
    GROUP BY
     w.id;
    `;
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
