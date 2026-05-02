const pool = require('../../common/db/mysql');

exports.addToCart = async (userId, productId, qty) => {
  await pool.execute(
    `INSERT INTO cart_items (user_id, product_id, qty)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE qty = qty + ?`,
    [userId, productId, qty, qty]
  );
};

exports.getCart = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT c.product_id, c.qty, p.title, p.price
     FROM cart_items c
     JOIN products p ON p.id = c.product_id
     WHERE c.user_id = ?`,
    [userId]
  );
  return rows;
};

exports.removeItem = async (userId, productId) => {
  await pool.execute(
    `DELETE FROM cart_items WHERE user_id=? AND product_id=?`,
    [userId, productId]
  );
};