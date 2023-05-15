const deleteImg = require("../helpers/deleteImages");
const getPool = require("../infrastructure/database");

const addImagesByIdExercise = async (idExercise, name, principal) => {
  const pool = await getPool();
  const workoutSql = `SELECT id FROM workout WHERE id = ?`;
  const [workout] = await pool.query(workoutSql, idExercise);

  if (workout.length === 0) {
    return false;
  }

  const sql = `INSERT INTO exerciseImages(name, principal, idExercise) VALUES (?, ?, ?)`;

  const principalValue = principal ? 1 : 0;

  const [exercises] = await pool.query(sql, [name, principalValue, idExercise]);

  const imageUrl = `http://localhost:3000/images/${name}`;
  return imageUrl;
  // return true;
};
const removePrincipalByExerciseId = async (id) => {
  const pool = await getPool();
  const sql = `
      UPDATE exerciseImages SET principal = 0
      WHERE idExercise = ?
    `;
  await pool.query(sql, id);

  return true;
};

const findImageById = async (id) => {
  // Conectar con base de datos
  const pool = await getPool();
  const sql = `SELECT * FROM exerciseImages WHERE id = ?`;
  const [exercises] = await pool.query(sql, id);

  return exercises[0];
};

const deleteExerciseImageById = async (id, pathImage) => {
  console.log("id", id);
  const pool = await getPool();
  const sql = "DELETE FROM exerciseImages WHERE id = ?";
  await pool.query(sql, id);

  // Borramos la imagen fisica
  console.log("pathImage", pathImage);
  await deleteImg(pathImage);

  return true;
};

const findAllImagesByIdExercise = async (idExercise) => {
  // console.log("===> IK <===");
  // Conectar con base de datos
  const pool = await getPool();
  const sql = `
      SELECT * FROM exerciseImages WHERE idExercise = ?
      ORDER BY principal DESC
    `;
  const [exercises] = await pool.query(sql, idExercise);

  return exercises;
};

module.exports = {
  addImagesByIdExercise,
  deleteExerciseImageById,
  findImageById,
  findAllImagesByIdExercise,
  removePrincipalByExerciseId,
};
