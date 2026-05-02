const pool = require('../../common/db/mysql');

exports.create = async ({ name, slug, parent_id, icon }) => {
  const [result] = await pool.execute(
    `INSERT INTO menus (name, slug, parent_id, icon)
     VALUES (?, ?, ?, ?)`,
    [name, slug, parent_id, icon]
  );
  return result.insertId;
};


exports.findByType = async () => {
  const [rows] = await pool.execute(
    'SELECT * FROM menus WHERE status = 1',
  );

  return rows;
};