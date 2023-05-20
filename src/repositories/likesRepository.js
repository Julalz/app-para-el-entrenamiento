const getPool = require("../infrastructure/database");

const addLike = async (userId, workoutId) => {
  const pool = await getPool();
  const sql = `INSERT INTO likes (user_id, workout_id) VALUES (?, ?)`;

  await pool.query(sql, [userId, workoutId]);

  return true;
};

const removeLike = async (userId, workoutId) => {
  const pool = await getPool();
  const sql = `DELETE FROM likes WHERE user_id = ? AND workout_id = ?`;

  await pool.query(sql, [userId, workoutId]);

  return true;
};

const updateLikesCount = async (workoutId) => {
  const pool = await getPool();
  const sql = `UPDATE workout SET likesCount = (SELECT COUNT(*) FROM likes WHERE workout_id = ?) WHERE id = ?`;

  await pool.query(sql, [workoutId, workoutId]);
};

const getLikeByWorkoutAndUser = async (workout_id, user_id) => {
  const pool = await getPool();
  const sql = `SELECT * FROM likes WHERE workout_id = ? AND user_id = ?`;
  const [likes] = await pool.query(sql, [workout_id, user_id]);

  if (likes.length === 0) {
    return null;
  }

  return likes[0];
};

module.exports = {
  addLike,
  removeLike,
  updateLikesCount,
  getLikeByWorkoutAndUser,
};
