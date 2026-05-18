const service = require('./product.service');
const imagekit = require('../../config/imagekit');
const xlsx = require('xlsx');
const fs = require('fs');

exports.create = async (req, res) => {

  try {

    const files = req.files || [];
    let uploadedImages = [];
    for (const file of files) {
      const response = await imagekit.upload({
        file: file.buffer,
        fileName: Date.now() + '-' + file.originalname,
        folder: '/products'
      });
      uploadedImages.push(response.url);
    }
    const payload = {
      ...req.body,
      images: uploadedImages
    };

    const id = await service.createProduct(payload);

    res.json({
      message: 'Product created',
      id,
      images: uploadedImages
    });

  } catch (err) {

    console.error(err);

    res.status(400).json({
      error: err.message
    });
  }
};

exports.getAll = async (req, res) => {
    const data = await service.getProducts();
    res.json(data);
};

exports.getOne = async (req, res) => {
    try {
        const data = await service.getProduct(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.update = async (req, res) => {

  try {

    const files = req.files || [];

    let uploadedImages = [];

    for (const file of files) {

      const response = await imagekit.upload({
        file: file.buffer,
        fileName: Date.now() + '-' + file.originalname,
        folder: '/products'
      });

      uploadedImages.push(response.url);
    }

    const payload = {
      ...req.body
    };

    if (uploadedImages.length > 0) {
      payload.images = uploadedImages;
    }

    await service.updateProduct(req.params.id, payload);

    res.json({
      message: 'Updated successfully',
      images: uploadedImages
    });

  } catch (err) {

    res.status(400).json({
      error: err.message
    });
  }
};

exports.remove = async (req, res) => {
    try {
        await service.deleteProduct(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await service.updateStatus(req.params.id, status);
        res.json({ message: 'Status updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.bulkUpload = async (req, res) => {
    try {
        const filePath = req.file.path;

        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const data = xlsx.utils.sheet_to_json(sheet);

        if (data.length > 10) {
            return res.status(400).json({
                error: 'Only 10 products allowed per upload',
            });
        }

        await service.bulkCreate(data);

        fs.unlinkSync(filePath); // delete file after processing

        res.json({ message: 'Bulk upload successful' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};