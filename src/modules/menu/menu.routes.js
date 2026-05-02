const express = require('express');
const router = express.Router();
const controller = require('./menu.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', authMiddleware, controller.getAll);
router.post('/', controller.create);

module.exports = router;