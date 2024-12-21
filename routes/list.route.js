const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const verifyCookie = require('../middlewares/authMiddleware');

const app = express();

app.use(cookieParser());
const {createList, getAllLists, getListById,updateList,deleteList} = require('../controllers/list.controller'); // Adjust path as needed

router.post('/',verifyCookie, createList);
router.get('/', getAllLists);
router.get('/:id', getListById);
router.put('/:id',verifyCookie, updateList);
router.delete('/:id',verifyCookie, deleteList);



module.exports = router;
