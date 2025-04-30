import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {AvalibleUserRoles,UserRolesEnum} from "../utils/constants.js";

const userschema = new Schema({
    avatar:{
        type:{
            url:String,
            localpath:String
        },
        default:{
            url:`https://https://placehold.co/600x400`, // if do not have any image
            localpath:""
        }
        
    },
    usename:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
      

    },
    fullname:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:[true,"password is required"],
       
    },
    isemailverified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:AvalibleUserRoles,
        default:UserRolesEnum.MEMBER

    },
    forgotpasswordtoken:{
        type:String,
       

    },
    forgotpasswordexpiry:{
        type:Date,

    },
    refreshToken:{
        type:String,
    },
    emailverificationtoken:{
        type:String,

    },
    emaiverificationexpiry:{
        type:Date,
    }


},{timestamps:true}
);

//hash password 
userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Compare passwords
  userschema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

// generate the acess tokens
userschema.methods.generateAcessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.usename,
            role:this.role
        },
        process.env.TOKEN_SECRET,
        {expiresIn:process.env.TOKEN_EXPIRY}
       
    )
}

// generate refresh tokens

userschema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
          
        },
        process.env.TOKEN_SECRET,
        {expiresIn:this.process.env.TOKEN_EXPIRY}
       
    )
}

//EMAIL VERIFICATION
userschema.methods.generateTemporayToken=function(){
    const unHashedToken=crypto.randomBytes(20).toString("hex");

    const hasedToken=crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry= Date.now() + (20*60*1000) //20min

    return {hasedToken,unHashedToken,tokenExpiry}
        
}



 const User=mongoose.model("User",userschema)
 export default User;