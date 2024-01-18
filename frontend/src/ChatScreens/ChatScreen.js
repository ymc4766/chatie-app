import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import ChatUserHeader from "./ChatUsersHeader";
import ChatContainer from "./ChatContainer";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessages } from "../redux/chatSlice";
import SocketContext from "../Context/SocketContext";
import Call from "./VideoActions/Call";

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
function ChatScreen({ onClose, socket, onlineUsers, typing, callUser }) {
  //  onst [showRinging, setShowRinging] = useState(false); // Add this state

  //   const [call, setCall] = useState(callData);
  //   c const [stream, setStream] = useState();

  //   const [callAccepted, setCallAccepted] = useState(false);

  //   const myVideo = useRef();
  //   const userVideo = useRef();

  //   // const { receivingCall, callEnded, socketId } = call;
  //   const { receivingCall, callEnded, socketId } = call;

  const { userInfo } = useSelector((state) => state.auth);
  const { activeConversation, messages } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  //   //Call Api fn'lty
  //   useEffect(() => {
  //     setUpMedia();
  //     socket.on("setup socket", (id) => {
  //       setCall({ ...call, socketId: id });
  //     });
  //     socket.on("call user", (data) => {
  //       setCall({
  //         ...call,
  //         socketId: data.from,
  //         name: data.name,
  //         picture: data.picture,
  //         signal: data.signal,
  //         receivingCall: true,
  //       });
  //       setShowRinging(true);
  //     });
  //   }, []);

  //   // console.log("socketId ----> ", call.socketId);

  //   const callUser = () => {
  //     enableMedia();
  //     setCall({
  //       ...call,
  //       name: getConversationName(userInfo, activeConversation?.users),
  //       picture: getConversationPicture(userInfo, activeConversation?.users),
  //     });
  //     const peer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream: stream,
  //     });

  //     peer.on("signal", (data) => {
  //       socket.emit("call user", {
  //         userToCall: getConversationId(userInfo, activeConversation?.users),
  //         signal: data,
  //         from: socketId,
  //         name: userInfo?.name,
  //         picture: userInfo?.picture,
  //       });
  //     });
  //   };

  //   const setUpMedia = () => {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: true })
  //       .then((stream) => {
  //         setStream(stream);
  //         // userVideo.current.srcObject = stream;
  //       });
  //   };

  //   const enableMedia = () => {
  //     myVideo.current.srcObject = stream;

  //     // console.log("video call clicked");
  //   };

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
