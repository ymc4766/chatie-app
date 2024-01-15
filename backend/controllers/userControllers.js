import logger from "../config/logger.js";
import User from "../models/userModel.js";

import { searchUserService } from "../services/userServices.js";
import createHttpError from "http-errors";

import { asyncHandler } from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // const existingUser = await User.findOne({ email, username });
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,

    password,
  });

  if (user) {
    const token = generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,

      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // const user = await User.findOne({ email });

  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("use a valid email and password");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({ message: " logged Out Succesfully" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Get Login Status
export const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

export const allusers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json({ msg: "all users", count: users.length, users });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

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
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUserClr = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.dept = req.body.dept || user.dept;
    user.lvl1 = req.body.lvl1 || user.lvl1;
    user.procurement = req.body.procurement || user.procurement;

    user.local = req.body.local || user.local;

    user.isAdmin = req.body.isAdmin || user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      lvl1: updatedUser.lvl1,
      dept: updatedUser.dept,
      local: updatedUser.local,
      procurement: updatedUser.procurement,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(res, updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const searchUsers = asyncHandler(async (req, res, next) => {
  try {
    const keyword = req.query.search;
    // res.send("search user");

    if (!keyword) {
      logger.error("please add search query");
      throw createHttpError.BadRequest("please add a name to search ");
    }

    const users = await searchUserService(keyword, req.user.userId);
    res.status(200).json(users);
  } catch (error) {}
});
