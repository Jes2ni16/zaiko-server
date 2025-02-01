const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyByUrl,
  updateProperty,
  deleteProperty,
}  =require('../controllers/project.controller');

// Route to create a new property
router.post('/', createProperty);

// Route to get all properties
router.get('/', getProperties);

// Route to get a single property by ID
router.get('/:projectUrl', getPropertyByUrl);

// Route to update a property by ID
router.put('/:id', updateProperty);

// Route to delete a property by ID
router.delete('/:id', deleteProperty);

module.exports = router;
