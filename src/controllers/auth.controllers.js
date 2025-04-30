import { body } from "express-validator";
import { asyncHandler } from "../utils/async-handeler.js";
import User from "../model/user.models.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendmail, emailVerificationMailgenContent } from "../utils/mail.js"
import {AvalibleUserRoles,UserRolesEnum} from "../utils/constants.js";
import nodemailer from "nodemailer"

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
    //Algorithms

    //1 get user data
    const { email, usename, password, fullname,role } = req.body;
    if (!email || !usename || !password || !fullname) {
        res.status(400).json({ message: "All fields are required" })
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        res.status(400).json({ message: "User already exist" })
    }
    //2 create user
    try {
        const user = await User.create({
            fullname,
            usename,
            email,
            password,
            role
        })
        // console.log(user);
        // res.status(201).json({
        //     meassage: "succesfully register"
        // })
        const token = await crypto.randomBytes(32).toString("hex");
        // const hashedToken = await crypto.createHash("sha256").update(token).digest("hex");
        user.emailverificationtoken = token;
        await user.save();


        //send mail to the user
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDERMAIL, // sender address
            to: user.email, // list of receivers
            subject: "verify your email✔", // Subject line
            text: `please click the following link:
            ${process.env.BASE_URL}/api/v1/auth/verify/${token}`,
            // html: "<b>Hello world?</b>", // html body


        }
        await transporter.sendMail(mailOptions)

        res.status(200).json({
            message: "User registered successfully. Please verify your email.",
            success: true
        })

    }
    catch (error) {
        console.log(error);
        

        res.status(400).json({ message: "Error in creating user", })


    }





    // 2.validate
    // registrationValidation(body)
})

const loginUser = asyncHandler(async (req, res) => {
    //Algorithms

    //1 get user data
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "all fildes are required" })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    const isPasswordMatch = await user.ispasswordCorrect(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" })
    }
    const generateAcessToken = user.generateAcessToken();
    // console.log(generateAcessToken);
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,



    }
    res.cookie("generateAcessToken", generateAcessToken, cookieOptions)

    return res.status(200).json({
        success: true,
        message: "login succesfull",
        generateAcessToken,
        user: {
            id: user._id,
            name: user.usename,
            email: user.email,
            role: user.role
        }



    })



    // 2.validate

})

const logoutUser = asyncHandler(async (req, res) => {
    //Algorithms
    //clear the cookies
    try{
        res.cookie("generateAcessToken","",{
            httpOnly:false,
            secure:false,
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        });
        res.status(200).json({
            success:true,
            message:"logout succesfully"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
           
            
            message:"logout unsuccesfull"
        })


    }

   
})

const verifyEmail = asyncHandler(async (req, res) => {
    //Algorithms

    //1 get user data
    const { token } = req.params;
    console.log(token);
    if (!token) {
        return res.status(400).json({ message: "invalid token" })
    }
    const user = await User.findOne({ emailverificationtoken: token })
    if (!user) {
        return res.status(400).json({ message: "invalid token" })
    }
    user.isemailverified = true;
    user.emailverificationtoken = undefined

    await user.save()
    res.status(200).json({ message: "email is verified" })



    // 2.validate
    // registrationValidation(body)
})

const resendEmailVerification = asyncHandler(async (req, res) => {
    //Algorithms

    //1 get user data
    const { email, usename, password } = req.body;

    // 2.validate
    // registrationValidation(body)
})


const refreshAcessToken = asyncHandler(async (req, res) => {
    //Algorithms

    //1 get user data
    const { email, usename, password } = req.body;

    // 2.validate
    // registrationValidation(body)
})

const forgotPasswordRequest = asyncHandler(async (req, res) => {
    //Algorithms

    try{
        //get email
        const{email}=req.body;
        if(!email){
            res.status(400).json({
                message:"email is required"
            })
        }
        //find user 
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"invalid email id"})
        }
        //we have to set reset password token and resetpasswordExpiry
        const {hasedToken,unHashedToken,tokenExpiry}=user.generateTemporayToken();
        user.forgotpasswordtoken=unHashedToken;
        user.forgotpasswordexpiry=tokenExpiry;
        await user.save()
        const forgotpasswordurl=`${process.env.BASE_URL}/api/v1/auth/reset-password/${unHashedToken}`

        //send the token via mail to the user
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });
        const mailOptions = {
            from: process.env.MAILTRAP_SENDERMAIL, // sender address
            to: user.email, // list of receivers
            subject: "verify your email✔", // Subject line
            text: `please click the following link:${forgotpasswordurl}`,
            // html: "<b>Hello world?</b>", // html body


        }
        await transporter.sendMail(mailOptions)
        res.status(200).json({
            message: "forfot password link send to your email",
            success: true
        })

        



    }
    catch(err){
        res.status(400).json({
            message: "link send failed.",
            success: false
        })

    }
})

const ChangeCurrentPassowrd = asyncHandler(async (req, res) => {
    //Algorithms
    try{
        const {token}=req.params;
        const {password}=req.body;
        if(!token || !password){
            res.status(400).json({
                message:"all filed are required"
            })
        }
        try{
            const user=await User.findOne({
                forgotpasswordtoken:token,
                forgotpasswordexpiry:{$gt:Date.now()}
            })
            if(!user){
                res.status(400).json({
                    message:"user not found"
                })
            }
            //set password in user
            //reset token and reset expiry field
            user.password=password;
            user.forgotpasswordtoken=undefined;
            user.forgotpasswordexpiry=undefined;
            await user.save();
            res.status(200).json({
                 message:"reset password succesfully"

            })

        }
        catch(err){
            res.status(400).json({
                message:"reset password unsuccesfully"

           })

        }

    }
    catch(error){
        res.status(400).json({
            message:"reset password unsuccesfully some problem occured"

       })

    }

  
})


const getCurrentUser = asyncHandler(async (req, res) => {
    //Algorithms

    //1 get user data for cuser
    try{
        // const data=req.user;
      
        
        // console.log("reached at profie level",data);
        const user=await User.findById(req.user._id).select('-password');
        if(!user){
            res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            message:" yeah i got you",
            user
        })

    }
    catch(err){
        res.status(400).json({
            message:"cant reach at profile"
        })

    }

    // 2.validate
    // registrationValidation(body)
})


export { registerUser, loginUser, verifyEmail,getCurrentUser,logoutUser,resendEmailVerification,refreshAcessToken,forgotPasswordRequest,ChangeCurrentPassowrd }