const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Add unique identifier to the filename
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename with the original file extension
  },
});

// File upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
