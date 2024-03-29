const { StatusCodes } = require('http-status-codes');
const asyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken")


const verifyuser=(req, res, next)=>{
    // console.log(req)
   try {
     const token = req.headers.authorization.split(' ')[1];
    //  console.log(token)
     if(!token){
         return res.status(401).json({ message: "Unauthorized access" });
     }
     const user=jwt.verify(token,process.env.SECRET_KEY)
      req.userId=user.userId
     next();
   } catch (error) {
         res.status(400).json({message: error.message});
   }
}

module.exports={verifyuser}