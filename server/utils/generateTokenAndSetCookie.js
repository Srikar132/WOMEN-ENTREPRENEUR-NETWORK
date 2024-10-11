import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
export const generateTokenAndSetCookie = (res , userId) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn : "7d"});

    res.cookie("authToken" , token , {
        httpOnly : true ,
        sameSite : "strict" ,
        secure : process.env.NODE_ENV === "production" ,
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    return token;
}