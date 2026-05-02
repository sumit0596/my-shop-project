const repo = require('./category.repository');

exports.createCategory = async (data) => {
  if (!data.name) throw new Error('Name required');
  return repo.create(data);
};

exports.getCategories = async () => {
  return repo.findAll();
};

exports.updateCategory = async (id, data) => {
  await repo.update(id, data);
};

exports.deleteCategory = async (id) => {
  await repo.remove(id);
};