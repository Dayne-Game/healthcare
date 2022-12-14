import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ 
        userInfo: {id: user.id, name: user.name, email: user.email},
        tokenInfo: generateToken(user._id, user.name, user.email) 
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    GET LOGGED IN USER DETAILS.
// @route   GET /api/users/current
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id).select("-password");
        res.json(currentUser);
    } catch (error) {
        res.status(500);
        throw new Error("Invalid User Data");
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
    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({ 
            userInfo: {id: user.id, name: user.name, email: user.email},
            tokenInfo: generateToken(user._id)
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