//Router Configuration
const express = require('express');
const router = express.Router();
const authenticationCheck = require('../Middleware/middleware')
const userController = require('../Controller/userController')

//auth router
router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/user/:userId', userController.getUserInfo);

//capital router
router.get('/balance',authenticationCheck,capitalController.getBalance)

module.exports = router;