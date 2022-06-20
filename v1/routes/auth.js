const express = require('express');
const checkAuth = require('../middlewares/check-auth')
const router = express.Router();
const authController = require('../controller/auth');


router.post('/login', authController.login );




module.exports = router;