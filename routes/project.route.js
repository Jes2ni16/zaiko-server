import express from 'express';

const router = express.Router();
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../controllers/project.controller';

// Route to create a new property
router.post('/', createProperty);

// Route to get all properties
router.get('/', getProperties);

// Route to get a single property by ID
router.get('/:id', getPropertyById);

// Route to update a property by ID
router.put('/:id', updateProperty);

// Route to delete a property by ID
router.delete('/:id', deleteProperty);

module.exports = router;
