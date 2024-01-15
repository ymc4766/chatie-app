import logger from "../config/logger.js";
import { updateLatestMessage } from "../services/conversationServices.js";
import {
  createMessage,
  getConvoMessages,
  populatedMessage,
} from "../services/messageServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  try {
    // res.send("send msg");
    const user_id = req.user.id;
    const { message, convo_id, files } = req.body;
    if (!convo_id || (!message && !files)) {
      logger.error("Please provider a conversation id and a message body");
      return res.sendStatus(400);
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    const newMessage = await createMessage(msgData);
    let populateMessage = await populatedMessage(newMessage._id);

    await updateLatestMessage(convo_id, newMessage);
    res.json(populateMessage);
  } catch (error) {}
});

export const getMessages = asyncHandler(async (req, res) => {
  try {
    const convo_id = req?.params?.convo_id;
    if (!convo_id) {
      logger.error("pls add  new chat ");
      res.sendStatus(400);
    }
    const messages = await getConvoMessages(convo_id);
    res.json(messages);
  } catch (error) {
    next(error);
  }
});
