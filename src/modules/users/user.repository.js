const pool = require('../../common/db/mysql');

exports.create = async ({ name, email, password }) => {
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password)
     VALUES (?, ?, ?)`,
    [name, email, password]
  );
  return result.insertId;
};

exports.findByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT * FROM users WHERE email=?`,
    [email]
  );
  return rows[0];
};