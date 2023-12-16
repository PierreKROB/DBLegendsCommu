const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authCreator = require('../middleware/authCreator');
const characterCtrl = require('../controllers/character');

router.get('/', characterCtrl.getAll);
router.post('/', characterCtrl.create);
router.get('/:id', characterCtrl.getOne); //we can change on auth

// router.put('/:id', characterCtrl.edit);
// router.delete('/:id', characterCtrl.delete);

module.exports = router;