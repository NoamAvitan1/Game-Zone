const User = require("../models/userModel");
const mongoose = require("mongoose");
const generateToken = require("../utils/generatToken");
const validator = require('validator');
const bcrypt = require('bcrypt');

const usersList = async (req ,res) => {
  try{
    let filter = {};
    let name = req.query.name ;
    let sort = req.query.sort || "_id";
    let limit = req.query.limit || 50;
    // if(!name){
    //   return res.status(400).json({ error: "Name is required" });
    // }
    if (name) {
      filter.name = new RegExp(name,"i");
    }

    
    const users = await User
      .find(filter)
      .sort({[sort]:-1})
      .limit(limit);
    res.status(200).json(users);
  }
    catch(error){
      console.error(error);
      return res.status(500).json({error,location:"usersList"});
    }
}


//send friend request
const friendRequest = async (req, res) => {
  const { _id: senderId } = req;
  const { id: recipientId } = req.params;
  if (!recipientId) {
    return res.status(400).json({ error: "Recipient not found" });
  }
  try {
    let recipient = await User.findById(recipientId);
    console.log(recipient.requests);
    const exist = recipient.requests.find((i) =>i.toString() === senderId.toString());
    if (exist) {
      recipient.requests = recipient.requests.filter((i) => i.toString !== senderId.toString());
      await recipient.save();
      return res.status(202).json({message:"Declined friend request"})
    } else {
      recipient.requests.push(senderId);
    }

    await recipient.save();
    return res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error,location:"friendRequest"});
  }
};


//stay login
const stayLogin = async (req, res) => {
  try {
      const user = await User
        .findById(req._id,{password:0,refresh_token:0})
        .populate('friends', '_id image name level xp')
        .populate('requests', '_id image name');
      console.log(user._id.toString());
      res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error,location:"stayLoginUser"});
  }
};



//accept friend request
const acceptFriendRequest = async(req, res, next) =>{
  const { _id: recipientId } = req;
  const { id: senderId } = req.params;
  let recipient = await User.findById(recipientId);
  let sender = await User.findById(senderId);
  if(!recipient || !sender){
    return res.status(404).json({ message: 'Accept friend request failed' });
  }
 try{
  const exist = recipient.requests.find((i) => i.toString() === senderId.toString());
  console.log(exist);
  if(exist){
    recipient.requests = recipient.requests.filter((i) => i.toString() !== senderId.toString());
    recipient.friends.push(senderId);
    sender.friends.push(recipientId);
  }
  else{
    return res.status(404).json({ message:'Failed'});
  }
  await recipient.save();
  await sender.save();
  next()
  // return res.status(200).json(recipient);
}
catch(error){
  console.log(error);
  res.status(500).json({ error,location:"loginUser"});
}
}


//remove friend 
const removeFriendRequest = async (req, res, next) => {
    const {id : friend_id} = req.params;
    const {_id: user_id} = req;
    let friend = await User.findById(friend_id);
    let user = await User.findById(user_id);
    if(!friend|| !user){
      return res.status(404).json({ message: 'Remove friend failed - User not exist'});
    }
  try {
    friend.friends = friend.friends.filter((i) => i.toString() !== user_id.toString());
    user.friends = user.friends.filter((i) => i.toString() !== friend_id.toString());
    await friend.save();
    await user.save();
    next();
    // return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({error,location:"removeFriendRequest"});
  }
}

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.login(email, password);

    const refreshToken = generateToken({_id:user._id,role:user.role},"60m");
    const accessToken = generateToken({_id:user._id,role:user.role},"15m");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 3600000,
      //secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 3600000,
      //secure: true,
    });

    user.refresh_token = refreshToken;
    await user.save();

    user.refresh_token = "******";
    user.password = "******";
    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message});
  }
};




//signup user
const signUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!name) {
      throw Error("Name is required");
    }
    let user = await User.signup(email, password, name);

    const refreshToken = generateToken({_id:user._id,role:"user"},"60m");
    const accessToken = generateToken({_id:user._id,role:"user"},"15m");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 3600000,
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 3600000,
      secure: true,
    });
    user.refresh_token = refreshToken;
    await user.save();

    user.password = "******";
    user.refresh_token = "******";
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message});
  }
};


//update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    const {xp,level,image,friends} = req.body;
    if (xp)user.xp = xp;
    if (level)user.level = level;
    if (image)user.image = image;
    if (friends)user.friends = friends;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error,location:"updateUser" });
  }
};


const updateUserPassword = async (req ,res) => {
  try {
    const {password,email} = req.body;
    console.log({password,email});
    let user = await User.findOne({email});
    if(!user) throw Error("email address is not a member , go to sign up");
    if(!validator.isStrongPassword(password)){
      throw Error('Passowrd not strong enough');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}



//delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error,location:"deleteUser" });
  }
};



const logOut = async (req, res) => {
  try {
     res.clearCookie("refreshToken",{
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
     res.clearCookie("accessToken",{
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
    usersList,
    signUser,
    loginUser,
    stayLogin,
    acceptFriendRequest,
    friendRequest,
    updateUser,
    removeFriendRequest,
    logOut,
    updateUserPassword
}
