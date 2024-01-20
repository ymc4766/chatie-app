import React, { useEffect, useRef, useState } from "react";
import SocketContext from "../Context/SocketContext";

import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import ChatUserHeader from "./ChatUsersHeader";
import ChatContainer from "./ChatContainer";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessages } from "../redux/chatSlice";

import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chatWithUser";

// const callData = {
//   socketId: "",
//   receivingCall: false,
//   callEnded: false,
//   name: "",
//   picture: "",
// };
function ChatScreen({ onClose, socket, onlineUsers, typing, call, callUser }) {
  const { userInfo } = useSelector((state) => state.auth);
  const { activeConversation, messages } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getConversations(userInfo?.token));
    }
  }, [dispatch, userInfo]);

  // useEffect(() => {
  //   socket.on("messageRecieve", (message) => {
  //     if (activeConversation?._id === message?.conversation?._id) {
  //       dispatch(updateMessages(message));
  //     }
  //   });
  // }, []);

  return (
    <div className=" text-slate-100">
      <ChatContainer
        onClose={onClose}
        onlineUsers={onlineUsers}
        typing={typing}
        call={call}
        callUser={callUser}
      />
      {/* <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        userVideo={userVideo}
        myVideo={myVideo}
        stream={stream}
      /> */}
    </div>
  );
}

const ChatScreenWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatScreenWithSocket;
