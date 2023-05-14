const deleteImg = require("../helpers/deleteImages");
const getPool = require("../infrastructure/database");

const addImagesByIdExercise = async (idExercise, imageName, principal) => {
  const pool = await getPool();
  const aql = `INSERT INTO exerciseImages(name, principal, idExercise) VALUES (?, ?, ?)`;

  const [exercises] = await pool.query(sql, [imageName, principal, idExercise]);

  return true;
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

  // Borramos la imagen fisica del coche de la carpeta public
  console.log("pathImage", pathImage);
  await deleteImg(pathImage);

  return true;
};

const findAllImagesByIdExercise = async (idExercise) => {
  console.log("===> IK <===");
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
