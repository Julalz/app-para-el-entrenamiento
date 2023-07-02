const getPool = require("../infrastructure/database");

const createUser = async (user) => {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT INTO users(
    name, email, password, verificationCode, role, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)`;

  const { name, email, password, verificationCode } = user;
  const [created] = await pool.query(sql, [
    name,
    email,
    password,
    verificationCode,
    "reader",
    now,
  ]);

  return created.insertId;
};
const findUserVerificationCode = async (verificationCode) => {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, password, role, verifiedAt FROM users WHERE verificationCode = ?";
  const [user] = await pool.query(sql, verificationCode);
  console.log("hola2");
  return user[0];
};
const atVerificationDate = async (id) => {
  const pool = await getPool();
  const now = new Date();
  const sql = "UPDATE users SET  verifiedAt = ? WHERE id = ?";

  const [created] = await pool.query(sql, [now, id]);
};

const uploadUserProfileImage = async (id, image) => {
  console.log("dsfd");
  const pool = await getPool();
  const sql = "UPDATE users SET image = ? WHERE id = ?";
  await pool.query(sql, [image, id]);

  return true;
};

const updateUserRole = async (email, role) => {
  const pool = await getPool();
  const sql = "UPDATE users SET role = ? WHERE email = ?";
  const [user] = await pool.query(sql, [role, email]);
  return user[0];
};
const findUserByEmail = async (email) => {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, password, role, verifiedAt, verificationCode, createdAt  FROM users WHERE email = ?";
  const [user] = await pool.query(sql, email);
  return user[0];
};
const findAllExercise = async () => {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, password, role, verifiedAt FROM users WHERE email = ?";
  const [user] = await pool.query(sql);
  return user[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findAllExercise,
  updateUserRole,
  findUserVerificationCode,
  atVerificationDate,
  uploadUserProfileImage,
};
