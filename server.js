require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/common/db/mysql');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});