const getPool = require("../infrastructure/database");

const addExercise = async (exercise) => {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT INTO workout(
    name,
    description,
    image,
    typology,
    muscle,
    created_at) VALUES (?, ?, ?, ?, ?, ?)`;

  const { name, description, image, typology, muscle, created_at } = exercise;

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

const findAllExercises = async () => {
  const pool = await getPool();
  const sql = `SELECT * FROM workout`;
  const [exercises] = await pool.query(sql);

  return { exercises };
};

module.exports = {
  addExercise,
  findAllExercises,
};
