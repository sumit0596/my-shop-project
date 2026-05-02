const service = require('./user.service');

exports.register = async (req, res) => {
  try {
    const id = await service.register(req.body);
    res.json({ message: 'User created', id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await service.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};