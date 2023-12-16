const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authCreator = require('../middleware/authCreator');
const teamCtrl = require('../controllers/team');

router.get('/', teamCtrl.getAll);
router.post('/', teamCtrl.create);
router.get('/:id', teamCtrl.getOne); //we can change on auth

// router.put('/:id', characterCtrl.edit);
// router.delete('/:id', characterCtrl.delete);

module.exports = router;