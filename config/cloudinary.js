const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'zaiko',
  api_key: '782791313651555',
  api_secret: 'orWTCMQWR-B5VTZDhFp0tU0tL7c'
});

module.exports = cloudinary;
