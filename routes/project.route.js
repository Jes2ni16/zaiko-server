
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).fields([
    { name: 'image', maxCount: 10 },  // For general images
    { name: 'location.images', maxCount: 10 }, // For location images
    { name: 'amenities.images', maxCount: 10 }, // For amenities images
    { name: 'building.images', maxCount: 10 }, // For building images
    // Add more fields as needed
  ]);
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/project.controller');


router.post('/',upload, propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
