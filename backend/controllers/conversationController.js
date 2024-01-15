import { findUser } from "../middleware/authMiddleware.js";
import createHttpError from "http-errors";

import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversationServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ConversationModal from "../models/conversationModel.js";

export const createOpenConversation = async (req, res, next) => {
  try {
    const sender_id = req.user._id;
    const { receiver_id } = req.body;
    // if (isGroup == false) {
    //check if receiver_id is provided
    if (!receiver_id) {
      logger.error(
        "please provide the user id you wanna start a conversation with !"
      );
      throw createHttpError.BadGateway("Oops...Something went wrong !");
    }
    // }
    //check if chat exists
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id,
      false
    );
    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      // let receiver_user = await findUser(receiver_id);
      let convoData = {
        name: "conversation name",
        picture: "conversation picture",
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversation(convoData);
      const populatedConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );
      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
});
