const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.post('/', verifyCookie, createUser);
router.get('/:id', getUserById);
router.put('/:id',verifyCookie, updateUser);
router.delete('/:id', verifyCookie, deleteUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
