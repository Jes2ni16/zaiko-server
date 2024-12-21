const express = require('express');
const cookieParser = require('cookie-parser');
const verifyCookie = require('../middlewares/authMiddleware');
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

const app = express();

app.use(cookieParser());
const router = express.Router();

router.get('/',verifyCookie, getAllUsers);
router.post('/',verifyCookie, createUser);
router.get('/:id', verifyCookie,getUserById);
router.put('/:id',verifyCookie, updateUser);
router.delete('/:id',verifyCookie, deleteUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', verifyCookie, checkLogin);

module.exports = router;
