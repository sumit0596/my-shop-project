const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG PNG WEBP allowed'));
  }
};

module.exports = multer({
  storage,
  fileFilter
});