const service = require('./cart.service');

exports.add = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { productId, qty } = req.body;

    await service.addToCart(userId, productId, qty);

    res.json({ message: 'Added to cart' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  const userId = req.user.userId;

  const data = await service.getCart(userId);
  res.json(data);
};

exports.remove = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  await service.removeFromCart(userId, productId);

  res.json({ message: 'Removed from cart' });
};