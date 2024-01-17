import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import SocketContext from "../Context/SocketContext";
import { getConversationId } from "../utils/chatWithUser";

function Conversations({ setIsChatScreenVisible, socket, typing }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.emit("join", userInfo?._id);
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
      // console.log("online users", users);
    });
  }, [userInfo]);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo, i) => {
              const isUserOnline = onlineUsers.some(
                (user) =>
                  user.userId === getConversationId(userInfo, convo?.users)
              );
              return (
                <Conversation
                  convo={convo}
                  key={convo._id}
                  setIsChatScreenVisible={setIsChatScreenVisible}
                  online={isUserOnline}
                  typing={typing}
                />
              );
            })}
      </ul>
    </div>
  );
}
export const ConversationsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversations {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ConversationsWithSocket;
