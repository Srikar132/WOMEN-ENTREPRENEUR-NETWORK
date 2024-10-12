import bcrypt from "bcryptjs"
import crypto from "crypto"

import { User } from "../models/user_model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {sendForgotPasswordEmail, sendResetPasswordEmail, sendVerifyEmail,sendWelcomeEmail} from "../utils/mailer.utils.js";


export const signup = async (req ,res ) => {
    const {email , password , name } = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required ");
        }

        const isUserExits = await User.findOne({email});
        if(isUserExits) {
            return res.status(400).json({message : "user already exits with provided creadentials"})
        }

        const hashedpassword = await bcrypt.hash(password , 10);
        const verificationToken = Math.floor(1000000 + Math.random() * 900000).toString();
        const user = new User({
            email ,
            password : hashedpassword ,
            name,
            verificationToken,
            verificationTokenExpiresAt : Date.now() +  24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();
        const data={
            subject:"verfication code for basic auth",
            text:`Your verficaiton code for basic auth is ${verificationToken}`,
            token:verificationToken
          }
        // jwt
        generateTokenAndSetCookie(res , user._id);
        await sendVerifyEmail(email ,data);

        return res.status(200).json({
            message : "user craeted succussfully" ,
            user : {
                ...user._doc ,
                password : undefined
            }
        })


    } catch (error) {
        console.log("Error signing up" , error)
        return res.status(400).json({error : error.message})
    }
}

export const verifyEmail = async (req , res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken : code ,
            verificationTokenExpiresAt : {$gt : Date.now()}
        });

        if(!user) {
            throw new Error("Invalid or expired verification code")
        }
        user.isVerified = true ;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        const data={
            name:user.name,
            email:user.email,
        }
        await user.save()
        await sendWelcomeEmail(data);

        return res.status(200).json({
            message : "succufully verified email" ,
            user : {
                ...user._doc ,
                password : undefined
            }
        })
    } catch (error) {
        console.log("Error veriffying email" , error)
        return res.status(400).json({error : error.message})
    }
}

export const login = async (req , res) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email}) ;

        if(!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordMatched = await bcrypt.compare(password , user.password) ;
        if(!isPasswordMatched) {
            throw new Error("Invalid password");
        }

        generateTokenAndSetCookie(res , user._id) ;
        user.lastLogin = Date.now();
        await user.save();
        return res.status(200).json({
            message : "Logged in successfully" ,
            user : {
                ...user._doc ,
                password : undefined
            }
        })
    } catch (error) {
        console.log("Error in login" , error)
        return res.status(400).json({error : error.message})
    }
}

export const logout = async (req  , res) => {
    res.clearCookie("authToken");
    res.status(200).json({message : "user logedout succussfully"})
}

export const forgotPassword = async (req , res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email}) ;
        if(!user) {
            throw new Error("Invalid credentails");
        }

        const resetPasswordVerificationToken = crypto.randomBytes(20).toString('hex') ;
        const resetPasswordVerificationTokenExpiresAt = Date.now() + 60 * 60 * 1000 ;

        user.resetPasswordVerificationToken = resetPasswordVerificationToken ;
        user.resetPasswordVerificationTokenExpiresAt = resetPasswordVerificationTokenExpiresAt ;
        await user.save();
        const data={
            name:user.name,
            email:user.email,
            reseturi:`${process.env.CLIENT_URL}/reset-password/${resetPasswordVerificationToken}`
        }
        await sendForgotPasswordEmail(data);
        return res.status(200).json({message : "reset link sent succussfully"});
    } catch (error) {
        console.log("Error veriffying email" , error)
        return res.status(400).json({error : error.message})
    }
}

export const resetPassword = async (req , res) => {
    const {password} = req.body ;
    const {token } = req.params;
    try {
        const user = await User.findOne({
            resetPasswordVerificationToken : token ,
            resetPasswordVerificationTokenExpiresAt : {$gt : Date.now()}
        });


        if(!user) {
            return res.status(400).json({message : "Invalid or expired token"})
        }

        const hashedPassword = await bcrypt.hash(password , 10) ;

        user.password = hashedPassword ;
        user.resetPasswordVerificationToken = undefined ;
        user.resetPasswordVerificationTokenExpiresAt = undefined ;

        await user.save() ;

        const data={
            name:user.name,
            email:user.email,
        }
       await sendResetPasswordEmail(data)

        return res.status(200).json({success : true , message : "Password reset successfull"})
    } catch (error) {
        console.log("Error in reset password" ,  error) ;
        return res.status(400).json({error : error.message})
    }
};

export const checkAuth = async  ( req , res ) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if(!user) {
            return res.status(400).json({success : false , message : "user not found"} )
        }

        return res.status(200).json({
            success : true ,
            user
        })
    } catch (error) {
        
    }
}