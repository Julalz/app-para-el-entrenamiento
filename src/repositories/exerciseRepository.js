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
const updateExerciseImagesById = async (id, name) => {
  const pool = await getPool();
  const sql = "UPDATE workout SET image = ? WHERE id = ?";
  const [updated] = await pool.query(sql, [name, id]);

  return true;
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
  updateExerciseImagesById,
};
