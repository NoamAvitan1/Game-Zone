const express = require('express');
const {logOut,removeFriendRequest,usersList,signUser,loginUser,friendRequest,stayLogin,acceptFriendRequest, updateUser, updateUserPassword} = require('../controllers/userController')
const {authentication, authenticationAdmin}  = require('../middleware/requireAuth');
const {validateSignUp,validateLogin, validateUpdateUser} = require('../middleware/validation');
const { getSignature } = require('../utils/uploadImage');
const { updateUserByAdmin, deleteUserByAdmin, usersListByAdmin } = require('../controllers/adminController');

const router = express.Router()

//upload image route
router.get("/uploadImage",authentication,getSignature);

//users List
router.get("/usersList",usersList);

//login route
router.post('/login',validateLogin,loginUser)

//stay login route
router.post('/stayLogin',authentication,stayLogin)

//signup route
router.post('/signup',validateSignUp,signUser)

//send friend request 
router.post('/sendFriendRequest/:id',authentication,friendRequest);

//accept friend request
router.post('/acceptFriendRequest/:id',authentication,acceptFriendRequest,stayLogin);

//remove friend request
router.post('/removeFriendRequest/:id',authentication,removeFriendRequest,stayLogin);

//update user
router.put('/update',authentication,validateUpdateUser,updateUser);

//logOut
router.post('/LogOut',logOut);

//resetPassword
router.post("/resetPassword",updateUserPassword);

//Admin
router.put('/adminUpdate/:id',authentication,authenticationAdmin,validateUpdateUser,updateUserByAdmin);
router.delete('/adminDelete/:id',authentication,authenticationAdmin,deleteUserByAdmin);
router.get('/adminUsersList',authentication,authenticationAdmin,usersListByAdmin);


module.exports = router;