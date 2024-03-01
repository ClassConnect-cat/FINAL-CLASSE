const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const auth = require('../services/auth');
const { requireLogin } = require('../middlewares/auth');

router.post('/register', controller.create);
router.post('/login', controller.login);
router.get('/id/:id', controller.findOne);
router.get('/all', controller.findAll);
router.get('/email/:email', controller.findOneByEmail);
router.put('/id/:id', [requireLogin], controller.update);
router.delete('/id/:id', [requireLogin], controller.delete);

module.exports = router;
