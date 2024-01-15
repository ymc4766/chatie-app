import createHttpError from "http-errors";
import MessageModel from "../models/messageModel.js";
import ConversationModal from "../models/conversationModel.js";

export const createMessage = async (msg) => {
  const newMessage = await MessageModel.create(msg);
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return newMessage;
};

export const populatedMessage = async (messageId) => {
  let msg = await MessageModel.findById(messageId)
    .populate({
      path: "sender",
      select: "name picture ",
      model: "User",
    })
    .populate({
      path: "conversation",
      select: "name picture isGroup users",
      model: "ConversationModal",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "User",
      },
    });

  if (!msg) throw createHttpError.BadRequest("Oops...Something went wrong !");
  return msg;
};

export const updateLatestMessage = async (convo_id, message) => {
  const updatedConvo = await ConversationModal.findByIdAndUpdate(convo_id, {
    latestMessage: message,
  });

  if (updatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return updatedConvo;
};

export const getConvoMessages = async (convo_id) => {
  const messages = await MessageModel.find({
    conversation: convo_id,
  })
    .populate("sender", "name picture email  status")
    .populate("conversation");

  if (!messages) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return messages;
};
