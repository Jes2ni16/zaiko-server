const express = require('express');
const cookieParser = require('cookie-parser');
const verifyCookie = require('../middlewares/authMiddleware');

const app = express();

app.use(cookieParser());
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  checkLogin
} = require('../controllers/user.controller');

router.get('/',verifyCookie, getAllUsers);
router.post('/',verifyCookie, createUser);
router.get('/:id', verifyCookie,getUserById);
router.put('/:id',verifyCookie, updateUser);
router.delete('/:id',verifyCookie, deleteUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/me', verifyCookie, checkLogin);

module.exports = router;
