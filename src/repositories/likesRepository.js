const getPool = require("../infrastructure/database");

const addLike = async (userId, workoutId) => {
  const pool = await getPool();
  const sql = `INSERT INTO likes (userId, workoutId) VALUES (?, ?)`;

  await pool.query(sql, [userId, workoutId]);

  return true;
};

const removeLike = async (userId, workoutId) => {
  const pool = await getPool();
  const sql = `DELETE FROM likes WHERE userId = ? AND workoutId = ?`;

  await pool.query(sql, [userId, workoutId]);

  return true;
};

const updateLikesCount = async (workoutId) => {
  const pool = await getPool();
  const sql = `UPDATE workout SET likesCount = (SELECT COUNT(*) FROM likes WHERE workoutId = ?) WHERE id = ?`;

  await pool.query(sql, [workoutId, workoutId]);
};

const getLikeByWorkoutAndUser = async (workoutId, userId) => {
  const pool = await getPool();
  const sql = `SELECT * FROM likes WHERE workoutId = ? AND userId = ?`;
  const [likes] = await pool.query(sql, [workoutId, userId]);

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
