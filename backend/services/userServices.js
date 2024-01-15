import User from "../models/userModel.js";

export const searchUserService = async (keyword, userId) => {
  const users = await User.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  }).find({
    _id: { $ne: userId },
  });

  return users;
};
