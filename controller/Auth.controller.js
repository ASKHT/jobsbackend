const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User=require("../model/user.model")
const { StatusCodes } = require('http-status-codes');
const asyncHandler = require("express-async-handler");

//register controller
const register = asyncHandler(async(req, res) => {
   const {name,email,password,mobile}=req.body;
     try {
       if(!name||!email||!password||!mobile){
          res.status(StatusCodes.BAD_REQUEST).send('some field is missing');
       }
      const existed=await User.findOne({email})
      if(existed){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists" });
      }
      const salt=await bcrypt.genSalt(10)
      const hashedpassword=await bcrypt.hash(password,salt);
      const user=await User.create({name:name,email:email,password:hashedpassword,mobile:mobile})
      user.password=undefined
      res.status(StatusCodes.OK).json({ message:"user registered sucessfully",user:user})
   } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({message:error.message})
     }
    
})

//login controller
const login=(asyncHandler(async(req, res) => {
   const {email,password}=req.body
   if(!email||!password) {
      res.status(StatusCodes.BAD_REQUEST).json({message:"some field is missing"})
   }
  const user=await User.findOne({email})
   if(!user.email){
      res.status(StatusCodes.BAD_REQUEST).json({message:"email does not exist"})
   }
   const passwordcheck=await bcrypt.compare(password,user.password)
   // console.log(passwordcheck)
   if(!passwordcheck){
      res.status(StatusCodes.UNAUTHORIZED).json({message:"user password is not matched"})
   }
   const token=jwt.sign({userId:user._id,name:user.name},process.env.SECRET_KEY,{
      expiresIn:"2d"
   })
   // console.log(req)
    res.json({
            message: "User logged in",
            name: user.name,
            token:token
        });

}))

module.exports ={register,login}