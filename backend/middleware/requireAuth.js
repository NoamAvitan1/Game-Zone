const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateToken = require("../utils/generatToken");
require('dotenv').config();



const authentication = async (req, res, next) => {
  const errorObject = { message: "unauthorized" };
  console.log("arrivad to authenticate");
  try {
    // checking if the access token is valid
    const accessToken = req.cookies.accessToken;

    if(accessToken){
        try {
            // checking that the access token is not expired
            const {_id,role} = jwt.verify(accessToken, process.env.SECRET);
            req._id = _id;
            req.role = role;
            return next();
        }
        catch {
            //if the access token expired, we need to continue and check if the refresh token is valid
            console.log("checking if refresh token is valid");
        }
    } else {
        throw {...errorObject,type:"accessToken"};
    }


    const {_id,role} = jwt.decode(accessToken);
    const user = await User.findById(_id);
    req._id = _id;
    req.role = role;

    if (user.refresh_token){
        try {
              // checking that the refresh token is not expired
              jwt.verify(user.refresh_token, process.env.SECRET);
        }
        catch {
              // if the refresh token expired the user will need to login again.
              throw {...errorObject,type:"refresh"};
        }
    } else {
        throw {...errorObject,type:"refresh"};
    }  
      // in case the refresh token is valid, 
      //  we need to make a new access and refresh token
      // and update in db

      // creating a new refresh token
      const newRefreshToken = generateToken({ _id , role }, "60m");

      user.refresh_token = newRefreshToken;
      user.save();

    
      // creating a new access token
      const newAccessToken = generateToken({ _id, role }, "15m");
      res.cookie('accessToken',newAccessToken);
      next();
  }
  catch (error) {
      console.log({error,function:"authentication"});
      return res.status(401).json(error);
  }
}


const authenticationAdmin = ({ role } , res, next) => {
    console.log("arrivad to authenticateAdmin");
  if (role == "admin") next();
  else {
        console.log("authentication admin failed");
      return res.status(401).json({ message: "unauthorized" })
  }
}
module.exports = {authentication,authenticationAdmin};
