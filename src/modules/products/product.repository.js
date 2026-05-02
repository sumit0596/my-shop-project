const pool = require('../../common/db/mysql');

exports.create = async ({ title, slug, description, price, stock, category_id }) => {
  const [result] = await pool.execute(
    `INSERT INTO products (title, slug, description, price, stock_available, category_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, slug, description, price, stock, (category_id || null)]
  );
  return result.insertId;
};

exports.findAll = async () => {
  const [rows] = await pool.execute(
        `SELECT id, title, slug, price, stock_available, status, category_id
     FROM products
     WHERE status='active'`
  );
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM products WHERE id=?`,
    [id]
  );
  return rows[0];
};

exports.update = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.title !== undefined) {
    fields.push("title=?");
    values.push(data.title);
  }

  if (data.price !== undefined) {
    fields.push("price=?");
    values.push(data.price);
  }

  if (data.stock !== undefined) {
    fields.push("stock_available=?");
    values.push(data.stock);
  }

  if (data.description !== undefined) {
    fields.push("description=?");
    values.push(data.description);
  }

  if (data.category_id !== undefined) {
    fields.push("category_id=?");
    values.push(data.category_id || null);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const query = `
    UPDATE products
    SET ${fields.join(", ")}
    WHERE id=?
  `;

  await pool.execute(query, values);
};

exports.remove = async (id) => {
  await pool.execute(
    `DELETE FROM products WHERE id=?`,
    [id]
  );
};

exports.updateStatus = async (id, status) => {
  await pool.execute(
    `UPDATE products SET status=? WHERE id=?`,
    [status, id]
  );
}