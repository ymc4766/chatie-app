import express from "express";
import trimRequest from "trim-request";
import {
  createOpenConversation,
  getConversations,
} from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/chat").post(trimRequest.all, protect, createOpenConversation);

router
  .route("/chat/conversation")
  .get(trimRequest.all, protect, getConversations);

export default router;
