const express = require('express');
const router = express.Router();
const auth = require('../services/auth');
const { requireLogin, requireProfe } = require('../middlewares/auth');

router.get('/normal', [requireLogin], json({ msg: 'alumne' }));
router.get('/profe', [requireLogin, requireProfe], json({ msg: 'profe' }));

module.exports = router;
