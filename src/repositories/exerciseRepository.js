const getPool = require("../infrastructure/database");

const addExercise = async (exercise) => {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT INTO workout (
      name,
      description,
      image,
      typology,
      muscle,
      likesCount,
      createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const { name, description, image, typology, muscle, likesCount, createdAt } =
    exercise;

  const [created] = await pool.query(sql, [
    name,
    description,
    image,
    typology,
    muscle,
    0,
    now,
  ]);

  return created.insertId;
};

const findAllExercise = async () => {
  const pool = await getPool();
  const sql = "SELECT * FROM workout";

  const [exercise] = await pool.query(sql);

  return exercise;
};

const findAllExerciseByMuscle = async (muscle) => {
  const pool = await getPool();
  const sql = "SELECT * FROM workout WHERE muscle = ?";

  const [exercise] = await pool.query(sql, [muscle]);

  return exercise;
};

const getExerciseById = async (workoutId) => {
  const pool = await getPool();
  const sql = `SELECT * FROM workout WHERE id = ?`;

  const [exercise] = await pool.query(sql, [workoutId]);

  return exercise[0];
};

const removeExerciseId = async (id) => {
  const pool = await getPool();
  const sql = "DELETE FROM workout WHERE id = ?";

  await pool.query(sql, [id]);

  return true;
};

module.exports = {
  addExercise,
  findAllExercise,
  findAllExerciseByMuscle,
  removeExerciseId,
  getExerciseById,
};
