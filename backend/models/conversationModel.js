import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Conversations name is required."],
      trim: true,
    },
    picture: {
      type: String,
      //   required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },

    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

const ConversationModal = mongoose.model(
  "ConversationModal",
  conversationSchema
);

export default ConversationModal;
