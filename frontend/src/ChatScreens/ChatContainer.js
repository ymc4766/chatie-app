import React, { useEffect, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatUserHeader from "./ChatUsersHeader";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessage, updateMessages } from "../redux/chatSlice";
import ChatActions from "./ChatActions";
import SocketContext from "../Context/SocketContext";

function ChatContainer({ onClose, socket, onlineUsers, typing, callUser }) {
  // const [typing, setTyping] = useState(false);
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const { token } = userInfo;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    // listening recieving msg
    socket.on("messageRecieve", (message) => {
      // console.log("message recice ---- -->", message);
      dispatch(updateMessages(message));
      dispatch(getConversationMessage(values));
    });

    //listening typing

    // socket.on("typing", (conversation) => setTyping(conversation));
    // socket.on("stop typing", () => setTyping(false));
  }, [dispatch]);

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessage(values));
    }
  }, [activeConversation]);

  return (
    <div
      className="relative w-full  h-screen border-l dark:border-l-dark_border_2
      "
    >
      <ChatUserHeader
        onClose={onClose}
        onlineUsers={onlineUsers}
        callUser={callUser}
      />
      <ChatMessages typing={typing} />
      <ChatActions />
    </div>
  );
}

export const ChatContainerWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatContainer {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatContainerWithSocket;
