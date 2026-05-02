const repo = require('./cart.repository');
const pool = require('../../common/db/mysql');

exports.addToCart = async (userId, productId, qty) => {
  if (!productId || !qty) {
    throw new Error('productId and qty required');
  }

  const [rows] = await pool.execute(
    `SELECT stock_available FROM products WHERE id=?`,
    [productId]
  );

  if (!rows.length) {
    throw new Error('Product not found');
  }

  if (rows[0].stock_available < qty) {
    throw new Error('Not enough stock');
  }

  await repo.addToCart(userId, productId, qty);
};

exports.getCart = async (userId) => {
  return repo.getCart(userId);
};

exports.removeFromCart = async (userId, productId) => {
  await repo.removeItem(userId, productId);
};