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
      createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)`;
  const { name, description, image, typology, muscle, createdAt } = exercise;

  const [created] = await pool.query(sql, [
    name,
    description,
    image,
    typology,
    muscle,
    now,
  ]);

  return created.insertId;
};

const findAllExercise = async () => {
  const pool = await getPool();
  const sql =
    "SELECT w.*, COUNT(l.id) likes FROM workout w LEFT JOIN likes l ON w.id = l.workout_id GROUP BY w.id  ";

  const [exercise] = await pool.query(sql);

  return exercise;
};
const findExerciseById = async (id) => {
  const pool = await getPool();
  const sql = "SELECT * FROM workout WHERE id = ?";

  const [exercise] = await pool.query(sql, id);

  return exercise[0];
};

const findAllExerciseByMuscle = async (muscle) => {
  const pool = await getPool();
  const sql = "SELECT * FROM workout WHERE muscle = ?";

  const [exercise] = await pool.query(sql, [muscle]);

  return exercise;
};

const getExerciseById = async (workout_id) => {
  const pool = await getPool();
  const sql = `SELECT * FROM workout WHERE id = ?`;

  const [exercise] = await pool.query(sql, [workout_id]);

  return exercise[0];
};

const findAllExercisesByTypology = async (typology) => {
  const pool = await getPool();
  const sql = "SELECT * FROM workout WHERE typology = ?";

  const [exercises] = await pool.query(sql, [typology]);

  return exercises;
};

const removeExerciseId = async (id) => {
  const pool = await getPool();
  const sql = "DELETE FROM workout WHERE id = ?";

  await pool.query(sql, [id]);

  return true;
};

const updateExerciseById = async (id, body) => {
  const pool = await getPool();
  const sql = "UPDATE workout SET ? WHERE id = ?";
  const [updated] = await pool.query(sql, [body, id]);

  return true;
};
const updateExerciseImagesByIdWorkout = async (id, name) => {
  const pool = await getPool();
  const sql = "UPDATE workout SET image = ? WHERE id = ?";
  const [updated] = await pool.query(sql, [name, id]);

  return true;
};
const pool = require("../infrastructure/database");

const deleteExerciseImageFromWorkoutById = async (exerciseId) => {
  const pool = await getPool();
  const sql = "UPDATE workout SET image = 0 WHERE id = ?";
  await pool.query(sql, [exerciseId]);
  return true;
};
const getWorkoutImageById = async (idExercise) => {
  const pool = await getPool();
  const sql = "SELECT image FROM workout WHERE id = ?";
  const [result] = await pool.query(sql, [idExercise]);

  return result[0].image;
};

module.exports = {
  addExercise,
  findAllExercise,
  findAllExerciseByMuscle,
  findAllExercisesByTypology,
  removeExerciseId,
  getExerciseById,
  updateExerciseById,
  findExerciseById,
  updateExerciseImagesByIdWorkout,
  deleteExerciseImageFromWorkoutById,
  getWorkoutImageById,
};
