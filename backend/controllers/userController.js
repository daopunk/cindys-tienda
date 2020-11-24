import asyncHandler from 'express-async-handler';
import CT_User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

// @desc: auth user & get token
// @route: POST /api/users/login
// @access: public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await CT_User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc: get user profile
// @route: GET /api/users/profile
// @access: private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await CT_User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc: register new user
// @route: POST /api/users
// @access: public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists  = await CT_User.findOne({ email });
  const user = await CT_User.create({ name, email, password });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc: update user
// @route: PUT /api/users/profile
// @access: private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await CT_User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });

  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc: get all users
// @route: GET /api/users
// @access: private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await CT_User.find({});
  res.json(users);
});

// @desc: get user by ID
// @route: GET /api/users/:id
// @access: private/admin
const getUser = asyncHandler(async (req, res) => {
  const user = await CT_User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc: update user
// @route: PUT /api/users/:id
// @access: private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await CT_User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc: delete user
// @route: DELETE /api/users/:id
// @access: private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await CT_User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User has been removed'});
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, getUser, updateUser, deleteUser }