const pool = require('../../common/db/mysql');

exports.create = async (data) => {

  const [result] = await pool.execute(
    `
    INSERT INTO products (
      title,
      slug,
      description,
      price,
      stock_available,
      stock_reserved,
      category_id,
      status,
      sku,
      barcode,
      weight,
      length,
      width,
      height,
      images
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.title,
      data.slug,
      data.description || '',
      data.price,
      data.stock || 0,
      data.stock_reserved || 0,
      data.category_id || null,
      data.status || 'draft',
      data.sku || null,
      data.barcode || null,
      data.weight || null,
      data.length || null,
      data.width || null,
      data.height || null,
      JSON.stringify(data.images || [])
    ]
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

  if (data.stock_reserved !== undefined) {
    fields.push("stock_reserved=?");
    values.push(data.stock_reserved);
  }

  if (data.status !== undefined) {
    fields.push("status=?");
    values.push(data.status);
  }

  if (data.sku !== undefined) {
    fields.push("sku=?");
    values.push(data.sku);
  }

  if (data.barcode !== undefined) {
    fields.push("barcode=?");
    values.push(data.barcode);
  }

  if (data.weight !== undefined) {
    fields.push("weight=?");
    values.push(data.weight);
  }

  if (data.length !== undefined) {
    fields.push("length=?");
    values.push(data.length);
  }

  if (data.width !== undefined) {
    fields.push("width=?");
    values.push(data.width);
  }

  if (data.height !== undefined) {
    fields.push("height=?");
    values.push(data.height);
  }

  if (data.images !== undefined) {
    fields.push("images=?");
    values.push(JSON.stringify(data.images));
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