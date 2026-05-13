const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'Myhome@12345Server',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  port: 3306  
});

module.exports = pool;