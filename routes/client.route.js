// routes/client.routes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Client = require('../models/client.model');
const router = express.Router();
const clientController = require('../controllers/client.controller');


// Route for creating a client
router.post('/', clientController.createClient);

// Route for retrieving all clients
router.get('/', clientController.getClients);

// Route for retrieving a single client by ID
router.get('/:id', clientController.getClientById);

// Route for updating a client by ID
router.put('/:id', clientController.updateClient);

// Route for deleting a client by ID
router.delete('/:id', clientController.deleteClient);

module.exports = router;
