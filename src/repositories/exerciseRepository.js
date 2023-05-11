"use strict";

const getPool = require("../infrastructure/database");

const findExerciseById = async () => {
  const pool = await getPool;
  const sql = "SELECT * FROM workout";
  const [exercise] = await pool.query(sql);
  return exercise[0];
};

module.exports = findExerciseById;
