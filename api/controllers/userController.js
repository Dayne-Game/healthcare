import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import decryptTokenID from "../utils/decryptTokenID.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.name, user.email),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    GET LOGGED IN USER DETAILS
// @route   GET /api/users/current
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decrypted_id = decryptTokenID(token);
    
        const user = await User.findById(decrypted_id).select("-password"); 
        
        res.json(user);
    } catch(error) {
        console.error(error);
        res.status(401);
        throw new Error("NO TOKEN");
    }
})

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Get User Email
    const userEmailExists = await User.findOne({ email });

    // Check user email
    if (userEmailExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Create Owner
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Owner data");
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

export { register, authUser, getUsers, getCurrentUser };