const pool = require('../../common/db/mysql');

exports.create = async ({ name, slug }) => {
  const [result] = await pool.execute(
    `INSERT INTO categories (name, slug) VALUES (?, ?)`,
    [name, slug]
  );
  return result.insertId;
};

exports.findAll = async () => {
  const [rows] = await pool.execute(
    `SELECT * FROM categories WHERE status='active'`
  );
  return rows;
};

exports.update = async (id, data) => {
  await pool.execute(
    `UPDATE categories SET name=?, slug=? WHERE id=?`,
    [data.name, data.slug, id]
  );
};

exports.remove = async (id) => {
  await pool.execute(
    `UPDATE categories SET status='inactive' WHERE id=?`,
    [id]
  );
};