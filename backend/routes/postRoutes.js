import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  allposts,
  createPost,
  getPost,
  toggleAddDislikeToPostCtrl,
  toggleAddLikePostCtrl,
} from "../controllers/postControllers.js";
import { upload } from "./uploadRoutes.js";

const router = express.Router();

router
  .route("/")
  .post(protect, upload.single("image"), createPost)
  .get(protect, allposts);
router.route("/:id").get(protect, getPost);
router.route("/post/like/:id").put(protect, toggleAddLikePostCtrl);
router.route("/post/dislike/:id").put(protect, toggleAddDislikeToPostCtrl);

export default router;
