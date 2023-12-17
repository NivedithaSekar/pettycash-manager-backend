//Router Configuration
const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController')

//auth router
router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/user/:userId', userController.getUserInfo);

module.exports = router;