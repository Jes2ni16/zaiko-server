
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).array('images');
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/project.controller');


router.post('/',upload, propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
