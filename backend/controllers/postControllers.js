import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import fs from "fs";
import Post from "../models/postModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileSizeFormatter } from "../routes/uploadRoutes.js";
// import { fileSizeFormatter } from "../utils/uploadImage.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const createPost = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an image.");
  }

  if (!title || !category || !description) {
    res.status(400);
    throw new Error(
      "Please provide title, category, and description for the post."
    );
  }
  // //1. Get the path to img

  try {
    // Upload to Cloudinary
    const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "NWS-app",
      resource_type: "image",
    });

    // Remove the locally stored file after successful upload to Cloudinary
    fs.unlink(req.file.path, (unlinkError) => {
      if (unlinkError) {
        console.error("Error deleting local file:", unlinkError);
      }
    });

    const fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    // Create a new post with the uploaded image URL
    const post = await Post.create({
      ...req.body,
      image: fileData.filePath,
      user: req.user.id,
    });

    res.status(200).json(post);
  } catch (error) {
    console.error("Error creating post:", error);

    // Handle errors more gracefully
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

export const allposts = asyncHandler(async (req, res) => {
  const hasCategory = req.query.category;

  try {
    //Check if it has a category
    if (hasCategory) {
      const posts = await Post.find({
        category: hasCategory,
      })
        .populate("user")
        .sort("-createdAt");

      res.json({ msg: "all posts", count: posts.length, posts });
    } else {
      const posts = await Post.find({}).populate("user").sort("-createdAt");
      res.json({ msg: "all posts", count: posts.length, posts });
    }
  } catch (error) {
    res.json(error);
  }

  // res.json({ msg: "all posts", count: posts.length, posts });
});

export const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // Check if the user has already viewed the post
  const post = await Post.findById(postId).populate("user");
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  // Check if the user has already viewed the post
  const alreadyViewed = post.views.includes(userId);
  if (!alreadyViewed) {
    // User hasn't viewed the post yet, update views
    post.views.push(userId);
    post.numViews = post.views.length;
    await post.save();
  }

  res.status(200).json(post);
});

export const toggleAddLikePostCtrl = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  // Check if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  const loginUserId = req.user._id;
  const isLiked = post.isLiked;

  // Check if the user has already liked the post
  const alreadyLiked = post.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyLiked) {
    // User already liked, remove the like
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: loginUserId }, isLiked: false },
      { new: true }
    );

    return res.json({ success: true, post: updatedPost });
  }

  // Check if the user has already disliked the post
  const alreadyDisliked = post.disLikes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyDisliked) {
    // User already disliked, remove the dislike and toggle like
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );

    return res.json({ success: true, post: updatedPost });
  }

  // Toggle like
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $push: { likes: loginUserId }, isLiked: true },
    { new: true }
  );

  res.json({ success: true, post: updatedPost });
});

// Similar changes can be made to toggleAddDislikeToPostCtrl

//------------------------------
//disLikes
//------------------------------

export const toggleAddDislikeToPostCtrl = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  // Check if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  const loginUserId = req.user._id;

  // Check if the user has already disliked the post
  const alreadyDisliked = post.disLikes.includes(loginUserId);

  // Check if the user has already liked the post
  const alreadyLiked = post.likes.includes(loginUserId);

  // If already liked, remove from likes
  if (alreadyLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: loginUserId },
    });
  }

  // Toggle dislikes
  const updatedPost = alreadyDisliked
    ? await Post.findByIdAndUpdate(
        postId,
        { $pull: { disLikes: loginUserId } },
        { new: true }
      )
    : await Post.findByIdAndUpdate(
        postId,
        {
          $addToSet: { disLikes: loginUserId },
          $pull: { likes: loginUserId },
        },
        { new: true }
      );

  res.json({ success: true, post: updatedPost });
});
