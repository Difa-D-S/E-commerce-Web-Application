import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';

// desc Register a new user
//route POST /api/users/login
//access Public
const registerUser = asyncHandler(async (req, res) => {
    // res.send("register user");
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("user already exists");
    }

    const user = await User.create({ name, email, password });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});


// desc Logout user / clear cookies
//route POST /api/users/login
//access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: "Logged Out Successfully"});
});


// desc Auth user & get token
//route POST /api/users
//access Public
const authUser = asyncHandler(async (req, res) => {
    // console.log(req.body);
     // res.send("auth user");

    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){

       generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401);
        throw new Error("Invalid email and password");
    }
   
});

// desc get user profile
//route GET /api/users/profile
//access Private
const getUserProfile = asyncHandler(async (req, res) => {
    // res.send("get user profile");
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });

    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

// desc update user profile
//route PUT /api/users/profile
//access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    // res.send("update user profile");
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });

    }else{
        res.status(404);
        throw new Error("User not found");
    }

});

// desc get all user
//route GET /api/users
//access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    res.send("get all users");
});

// desc delete user
//route DELETE /api/users/:id
//access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete users");
});

// desc delete user
//route GET /api/users/:id
//access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("get user by id");
});

// desc update user
//route PUT /api/users/:id
//access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("update user by id");
});

export {
    authUser, registerUser, getAllUsers, getUserById, getUserProfile, updateUser, updateUserProfile, deleteUser, logoutUser
}