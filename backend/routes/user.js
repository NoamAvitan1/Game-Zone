const express = require('express');
const {signUser,loginUser,friendRequest,stayLogin} = require('../controllers/userController')
const {authentication}  = require('../middleware/requireAuth');
const {validateSignUp,validateLogin} = require('../middleware/validation');

const router = express.Router()

//login route
router.post('/login',validateLogin,loginUser)

//stay login route
router.post('/stayLogin',stayLogin)

//signup route
router.post('/signup',validateSignUp,signUser)

//send friend request 
router.post('/sendFriendRequest/:id',authentication,friendRequest);


module.exports = router;