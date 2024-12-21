// routes/client.routes.js
const express = require('express');
const router = express.Router();
const { getClients, getClientById, getClientByUrl, createClient, updateClient , getClientByUrl, deleteClient} = require('../controllers/client.controller');
const cookieParser = require('cookie-parser');
const verifyCookie = require('../middlewares/authMiddleware');
const app = express();

app.use(cookieParser());

router.post('/',verifyCookie, createClient);
router.put('/:id',verifyCookie, updateClient);
router.delete('/:id',verifyCookie, deleteClient);
router.get('/',getClients);
router.get('/:id', getClientById);
router.get('/url/:url', getClientByUrl);


module.exports = router;
