import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import user from '../models/userModel.js';
import User from "../models/userModel.js";

// user must be authenticated
const protect = asyncHandler(async(req, res, next) => {
    let token;
    // console.log("sss");

    // read jwt from the "cookie"
    token = req.cookies.jwt;
    // console.log(token);

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWt_SECRET);

            // get user from database
            req.user =  await User.findById(decoded.userId).select("-password");
            next();
        }catch(error){
            res.status(404);
            throw new Error("Not Authorized, token failed")
        }
    }else{
        res.status(404);
        throw new Error("Not Authorized, no token");
    }
});


// user must be an admin
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(404);
        throw new Error("Not Authorized as an admin");
    }
};

export {protect, admin};