const User = require('../models/userModule');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// POST - /api/users/login
// Auth users and get token
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// POST - /api/users
// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('This user already exists');
  }

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
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// GET - /api/users/profile
// Get user profile | Private
const getProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = req.user;
  res.send({ _id, name, email, isAdmin });
});

module.exports = { userAuth, registerUser, getProfile };
