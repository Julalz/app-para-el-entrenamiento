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

module.exports = {
  addExercise,
  findAllExercise,
  findAllExerciseByMuscle,
  findAllExercisesByTypology,
  removeExerciseId,
  getExerciseById,
  updateExerciseById,
};
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

const removeExerciseId = async (id) => {
  const pool = await getPool();
  const sql = "DELETE FROM workout WHERE id = ?";

  await pool.query(sql, [id]);

  return true;
};

const findExerciseById = async (id) => {
  const pool = await getPool();
  const sql = "SELECT * FROM workout WHERE ID = ?";

  const [exercise] = await pool.query(sql, [id]);

  return exercise;
};

const updateExercise = async (id, exerciseData) => {
  const pool = await getPool();
  const { name, description, image, typology, muscle } = exerciseData;

  const sql = `
    UPDATE workout
    SET name = ?,
        description = ?,
        image = ?,
        typology = ?,
        muscle = ?
    WHERE id = ?
  `;

  await pool.query(sql, [name, description, image, typology, muscle, id]);

  return true;
};

const updateExercise = async (id, exerciseData) => {
  const pool = await getPool();
  const { name, description, image, typology, muscle } = exerciseData;

  const sql = `
    UPDATE workout
    SET name = ?,
        description = ?,
        image = ?,
        typology = ?,
        muscle = ?
    WHERE id = ?
  `;

  await pool.query(sql, [name, description, image, typology, muscle, id]);

  return true;
};

module.exports = {
  addExercise,
  findAllExercise,
  findAllExerciseByMuscle,
  removeExerciseId,
  findExerciseById,
  updateExercise,
  updateExercise,
};
