import React, { useRef, useState } from "react";
import Attachments from "./inputActions/Attachments";
import ChatInput from "./inputActions/ChatInput";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, updateMessages } from "../redux/chatSlice";
import SendIcon from "../svg/Send";
import EmojiPickers from "./inputActions/EmojiPickers";
import SocketContext from "../Context/SocketContext";
// import EmojiPickers from "./inputActions/EmojiPicker";

function ChatActions({ socket }) {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [loading, setLoading] = useState(false);

  const textRef = useRef();
  const dispatch = useDispatch();
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const { token } = userInfo;

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newMsg = await dispatch(sendMessage(values));
    socket.emit("sendMsg", newMsg?.payload);
    // dispatch(updateMessages(newMsg.payload));

    console.log("nwMsg", newMsg);

    setMessage("");
    setLoading(false);
  };
  return (
    <form
      onSubmit={(e) => sendMessageHandler(e)}
      className="sticky w-full  dark:bg-dark_bg_2 h-[60px] flex items-center absolute bottom-0 py-2  select-none"
    >
      {/* container  */}
      <div className="w-full flex items-center gap-x-2">
        {/* emoji and attachment */}
        <ul className="flex  gap-x-2">
          <EmojiPickers
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachment={setShowAttachment}
          />
          <Attachments
            showAttachment={showAttachment}
            setShowAttachment={setShowAttachment}
            setShowPicker={setShowPicker}
          />
        </ul>
        {/* input  */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          textRef={textRef}
        />

        <button className="btn" type="submit">
          {status === "loading" && loading ? (
            <ClipLoader color="#0766AD" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithSocket;
