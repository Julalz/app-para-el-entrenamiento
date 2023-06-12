const getPool = require("../infrastructure/database");
const deleteImg = require("../helpers/deleteImages");

const addImagesByIdExercise = async (idExercise, name, principal) => {
  const pool = await getPool();
  const workoutSql = `SELECT id FROM workout WHERE id = ?`;
  const [workout] = await pool.query(workoutSql, [idExercise]);

  if (workout.length === 0) {
    return true;
  }

  const sql = `INSERT INTO exerciseImages(name, idExercise, principal) VALUES (?, ?, ?)`;
  const principalValue = principal ? 1 : 0;
  await pool.query(sql, [name, idExercise, principalValue]);

  const imageUrl = `http://localhost:3000/images/${name}`;
  return imageUrl;
};

const removePrincipalByExerciseId = async (idExercise) => {
  const pool = await getPool();
  const sql = `UPDATE exerciseImages SET principal = 0 WHERE idExercise = ?`;
  await pool.query(sql, [idExercise]);

  return true;
};

const updateExerciseImagesByIdWorkout = async (idExercise, name) => {
  const pool = await getPool();
  const sql = "UPDATE workout SET image = ? WHERE id = ?";
  await pool.query(sql, [name, idExercise]);

  return true;
};

const deleteExerciseImageById = async (id, imgPath) => {
  const pool = await getPool();
  const sql = "DELETE FROM exerciseImages WHERE id = ?";
  await pool.query(sql, [id]);

  await deleteImg(imgPath);

  return true;
};

const AddImageToExerciseTable = async (name, principal, idExercise) => {
  const pool = await getPool();
  const sql = `INSERT INTO exerciseImages(name, principal, idExercise) VALUES (?, ?, ?)`;
  const principalValue = principal ? 1 : 0;
  const [images] = await pool.query(sql, [name, principalValue, idExercise]);

  const imageUrl = `http://localhost:3000/images/${name}`;
  return imageUrl;
};

const findAllImagesByIdExercise = async (idExercise) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM exerciseImages WHERE idExercise = ?
    ORDER BY principal DESC
  `;
  const [exercises] = await pool.query(sql, [idExercise]);

  return exercises;
};

module.exports = {
  addImagesByIdExercise,
  removePrincipalByExerciseId,
  updateExerciseImagesByIdWorkout,
  deleteExerciseImageById,
  findAllImagesByIdExercise,
  AddImageToExerciseTable,
};
