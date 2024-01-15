import express from "express";
import trimRequest from "trim-request";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/messages").post(trimRequest.all, protect, sendMessage);

router.route("/messages/:convo_id").get(trimRequest.all, protect, getMessages);

export default router;
