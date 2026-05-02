// product.routes.js
const express = require('express');
const router = express.Router();
const controller = require('./product.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');


router.get('/', controller.getAll);         // List
router.get('/:id', controller.getOne);      // Single

router.post('/', authMiddleware, adminMiddleware, controller.create);
router.put('/:id', authMiddleware, adminMiddleware, controller.update);
router.delete('/:id', authMiddleware, adminMiddleware, controller.remove);
router.patch('/:id', authMiddleware, adminMiddleware, controller.updateStatus); 
router.post('/bulk-upload', upload.single('file'), controller.bulkUpload);

module.exports = router;