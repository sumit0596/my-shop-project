// product.service.js
const repo = require('./product.repository');

exports.createProduct = async (data) => {

    if (!data.title || !data.price || !data.category_id) {
        throw new Error('Missing required fields');
    }

    return repo.create(data);
};

exports.getProducts = async () => {

    const products = await repo.findAll();

    return products.map(product => ({
        ...product,
        images: product.images
            ? JSON.parse(product.images)
            : []
    }));
};

exports.getProduct = async (id) => {

    const product = await repo.findById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    return {
        ...product,
        images: product.images
            ? JSON.parse(product.images)
            : []
    };
};

exports.updateProduct = async (id, data) => {

    const existing = await repo.findById(id);

    if (!existing) {
        throw new Error('Product not found');
    }

    if (data.images) {

        const oldImages = existing.images
            ? JSON.parse(existing.images)
            : [];

        data.images = [
            ...oldImages,
            ...data.images
        ];
    }

    await repo.update(id, data);
};

exports.deleteProduct = async (id) => {
    const existing = await repo.findById(id);
    if (!existing) throw new Error('Product not found');

    await repo.remove(id);
};

exports.updateStatus = async (id, status) => {
    const existing = await repo.findById(id);
    if (!existing) throw new Error('Product not found');
    await repo.updateStatus(id, status);
}

exports.bulkCreate = async (products) => {
    for (const item of products) {

        if (!item.title || !item.price || !item.stock || !item.category_id) {
            throw new Error('Invalid data in Excel');
        }

        await repo.create({
            title: item.title,
            slug: item.slug,
            price: Number(item.price),
            stock: Number(item.stock),
            description: item.description || '',
            category_id: item.category_id || null
        });
    }
};