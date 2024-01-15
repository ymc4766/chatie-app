import React, { useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatUserHeader from "./ChatUsersHeader";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessage, updateMessages } from "../redux/chatSlice";
import ChatActions from "./ChatActions";
import SocketContext from "../Context/SocketContext";

function ChatContainer({ onClose, socket }) {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const { token } = userInfo;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation._id) {
      dispatch(getConversationMessage(values));
    }
  }, [dispatch, activeConversation]);

  useEffect(() => {
    socket.on("messageRecieve", (message) => {
      // console.log("message recice ---- -->", message);
      dispatch(updateMessages(message));
      dispatch(getConversationMessage(values));
    });
  }, [dispatch]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      <ChatUserHeader onClose={onClose} />
      <ChatMessages />
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
