const service = require('./category.service');

exports.create = async (req, res) => {
  try {
    const id = await service.createCategory(req.body);
    res.json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const data = await service.getCategories();
  res.json(data);
};

exports.update = async (req, res) => {
  await service.updateCategory(req.params.id, req.body);
  res.json({ message: 'Updated' });
};

exports.remove = async (req, res) => {
  await service.deleteCategory(req.params.id);
  res.json({ message: 'Deleted' });
};