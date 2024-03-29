const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
       name:{
          type: String,
          required: [true,"name is required"]
       },
       email:{
        type: String,
        required: [true,"email is required"],
        unique: true
       },
       password:{
        type: String,
        required:[ true,"password is required"],
       },
       mobile:{
        type:String,
        required: [true,"mobile is required"],
        unique: true
       }
},
{timestamps:true}

)

const User=mongoose.model("User",UserSchema)

module.exports=User