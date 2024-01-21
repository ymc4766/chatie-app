import React, { useEffect, useRef, useState } from "react";
import SocketContext from "../Context/SocketContext";

import { BsChat } from "react-icons/bs";
import Peer from "simple-peer";

import FriendsModal from "../screens/FriendsModal";
import "../styles/tweetButton.css";
import Call from "../ChatScreens/VideoActions/Call";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chatWithUser";
import Ringing from "../ChatScreens/VideoActions/Ringing";
import { getConversations, updateMessages } from "../redux/chatSlice";

let callData = {};
function ChatButton({ socket }) {
  const dispatch = useDispatch();

  const { activeConversation } = useSelector((state) => state.chat);

  const { userInfo } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [call, setCall] = useState({
    socketId: "",
    receivingCall: false, // Corrected property name
    callEnded: false,
    name: "",
    picture: "",
    signal: "",
  });
  const [show, setShow] = useState(false);
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showRinging, setShowRinging] = useState(false);
  // const { receivingCall, callEnded, socketId } = call;

  const myVideo = useRef({});
  // console.log("my video  ... ", myVideo);
  const userVideo = useRef({});
  const connectionRef = useRef();
  const { receivingCall, callEnded, socketId } = call;

  // const { receivingCall, callEnded, socketId } = call;

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
      // console.log("online users", users);
    });

    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, [dispatch]);

  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });

    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });

    socket.on("end call", () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receivingCall: false });
      myVideo.current.srcObject = null;
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);

  //call

  // call user fn
  const callUser = () => {
    enableMedia(); // Call enableMedia here
    setCall((prevCall) => ({
      ...prevCall,
      name: getConversationName(userInfo, activeConversation.users),
      picture: getConversationPicture(userInfo, activeConversation.users),
    }));
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(userInfo, activeConversation.users),
        signal: data,
        from: socketId,
        name: userInfo.name,
        picture: userInfo.picture,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  // Answer call fn
  const answerCall = () => {
    enableMedia();

    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  //--end call  funcion
  const endCall = () => {
    setShow(false);
    setCall({ ...call, callEnded: true, receivingCall: false });

    myVideo.current.srcObject = null;
    socket.emit("end call", call.socketId);
    connectionRef?.current?.destroy();
    // window.location.reload();
  };
  const setupMedia = () => {
    const constraints = {
      video: true,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };

  //get Conversations
  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getConversations(userInfo.token));
    }
  }, [userInfo]);

  return (
    <>
      <div>
        <button className="chat-button" onClick={handleButtonClick}>
          <BsChat />
        </button>
        {isModalOpen && !call.receiveingCall ? (
          <FriendsModal
            onClose={handleCloseModal}
            onlineUsers={onlineUsers}
            typing={typing}
            call={call}
            setCall={setCall}
            callUser={callUser}
            callAccepted={callAccepted}
          />
        ) : null}
        <div
          className={(show || call.signal) && !call.callEnded ? "" : "hidden"}
        >
          <Call
            call={call}
            setCall={setCall}
            callAccepted={callAccepted}
            myVideo={myVideo}
            userVideo={userVideo}
            stream={stream}
            endCall={endCall}
          />
        </div>
        {/* {call.name && ( */}

        {call?.receivingCall && !callAccepted ? (
          <Ringing
            myVideo={myVideo}
            userVideo={userVideo}
            call={call}
            setCall={setCall}
            answerCall={answerCall}
            endCall={endCall}
          />
        ) : null}
      </div>
    </>
  );
}

const ChatButtonWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatButton {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatButtonWithSocket;
