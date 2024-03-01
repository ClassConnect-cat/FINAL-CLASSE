const express = require('express');
const router = express.Router();
const controller = require('../controllers/languages');

router.get('/', controller.getAllClasses);
router.get('/:id', controller.getOneClass);
router.patch('/:classid/:userid', controller.addClassesRebo);
router.patch('/:userid/:classid/:profeid', controller.addClassesDono);
module.exports = router;