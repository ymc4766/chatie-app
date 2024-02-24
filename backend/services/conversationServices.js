import createHttpError from "http-errors";
import User from "../models/userModel.js";
import ConversationModal from "../models/conversationModel.js";

export const doesConversationExist = async (
  sender_id,
  receiver_id,
  isGroup
) => {
  if (isGroup === false) {
    let convos = await ConversationModal.find({
    // Code  here 
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (!convos)
      throw createHttpError.BadRequest("Oops...Something went wrong !");

    //populate message model
    convos = await User.populate(convos, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return convos[0];
  } else {
    //it's a group chat
    

    return convo;
  }
};

export const createConversation = async (data) => {
  const newConvo = await ConversationModal.create(data);
  if (!newConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldsToRemove
) => {
  const populatedConvo = await ConversationModal.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return populatedConvo;
};
export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModal.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
   // Code here e....
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    });
  return conversations;
};

export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModal.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  return updatedConvo;
};
