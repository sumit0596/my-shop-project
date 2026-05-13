const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/products', require('./modules/products/product.routes'));
app.use('/api/categories', require('./modules/categories/category.routes'));
app.use('/api/cart', require('./modules/cart/cart.routes'));
app.use('/api/users', require('./modules/users/user.routes'));
app.use('/api/menu', require('./modules/menu/menu.routes'));

module.exports = app;