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

const updateUserRole = async (email, role) => {
  const pool = await getPool();
  const sql = "UPDATE users SET role = ? WHERE email = ?";
  const [user] = await pool.query(sql, [role, email]);
  return user[0];
};

const findUserByEmail = async (email) => {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, password, role, verifiedAt FROM users WHERE email = ?";
  const [user] = await pool.query(sql, email);
  return user[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserRole,
};
