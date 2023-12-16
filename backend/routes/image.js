const express = require('express');
const router = express.Router();
const imageCtrl = require('../controllers/image');

router.get('/list', imageCtrl.getAll);
router.get('/:filename', imageCtrl.getImg);

module.exports = router;