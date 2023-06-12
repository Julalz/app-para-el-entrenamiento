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

const allLikesByWorkoutAndUser = async (workout_id, id) => {
  const pool = await getPool();
  const sql = `SELECT * FROM likes WHERE workout_id = ? AND user_id = ?`;
  const [likes] = await pool.query(sql, [workout_id, id]);

  if (likes.length === 0) {
    return null;
  }

  return likes[0];
};

const getWorkoutsWithLikesCount = async () => {
  const pool = await getPool();
  const sql = `
    SELECT w.*, COUNT(l.workout_id) AS likesCount
    FROM workout w
    LEFT JOIN likes l ON w.id = l.workout_id
    GROUP BY w.id
  `;

  const [result] = await pool.query(sql);

  return result;
};

module.exports = {
  addLike,
  removeLike,
  allLikesByWorkoutAndUser,
  getWorkoutsWithLikesCount,
};
