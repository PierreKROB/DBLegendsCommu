const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.create)
router.post('/login', userCtrl.login)
router.get('/isTempPassword', auth,userCtrl.isTempPassword)
router.put('/changePassword', auth, userCtrl.changePassword)

module.exports = router;