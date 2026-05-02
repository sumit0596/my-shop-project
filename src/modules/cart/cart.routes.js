const express = require('express');
const router = express.Router();
const controller = require('./cart.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/', authMiddleware, controller.add);
router.get('/', authMiddleware, controller.get);
router.delete('/:productId', authMiddleware, controller.remove);

module.exports = router;