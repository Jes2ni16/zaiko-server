const express = require('express');
const router = express.Router();
const {createList, getAllLists, getListById,updateList,deleteList, getListByUrl} = require('../controllers/list.controller'); // Adjust path as needed

// Route to create a new list
router.post('/', createList);

// Route to get all lists
router.get('/', getAllLists);

// Route to get a specific list by ID
router.get('/:id', getListById);
router.get('/url/:url', getListByUrl);

// Route to update a specific list by ID
router.put('/:id', updateList);

// Route to delete a specific list by ID
router.delete('/:id', deleteList);

module.exports = router;
