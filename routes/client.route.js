// routes/client.routes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const cookieParser = require('cookie-parser');
const verifyCookie = require('../middlewares/authMiddleware');
const app = express();

app.use(cookieParser());

router.post('/',verifyCookie, clientController.createClient);
router.get('/',verifyCookieclientController.getClients);
router.get('/:id', clientController.getClientById);
router.get('/url/:url', clientController.getClientByUrl);
router.put('/:id',verifyCookie, clientController.updateClient);
router.delete('/:id',verifyCookie, clientController.deleteClient);

module.exports = router;
