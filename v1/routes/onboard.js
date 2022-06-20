const express = require('express');
const checkAuth = require('../middlewares/check-auth')
const router = express.Router();
const UserController = require('../controller/onboard');


router.post('/signup', UserController.user_signup );
router.patch('/user/update',checkAuth, UserController.update_user );
router.delete('/user/delete/:id',checkAuth, UserController.delete_user);
router.get('/verify/:token', UserController.verifyUser );


module.exports = router;