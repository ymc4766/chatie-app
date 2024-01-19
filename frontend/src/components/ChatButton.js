import React, { useEffect, useRef, useState } from "react";
import { BsChat } from "react-icons/bs";
import Peer from "simple-peer";

import FriendsModal from "../screens/FriendsModal";
import "../styles/tweetButton.css";
import Call from "../ChatScreens/VideoActions/Call";
import { useSelector } from "react-redux";
import SocketContext from "../Context/SocketContext";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chatWithUser";
import Ringing from "../ChatScreens/VideoActions/Ringing";

function ChatButton({ socket }) {
  const [call, setCall] = useState({
    socketId: "",
    receivingCall: false,
    callEnded: false,
    name: "",
    picture: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [stream, setStream] = useState();
  const [isCallActive, setIsCallActive] = useState(false);
  const [showRinging, setShowRinging] = useState(false);

  const [callAccepted, setCallAccepted] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const { activeConversation } = useSelector((state) => state.chat);

  const { userInfo } = useSelector((state) => state.auth);

  // const { receivingCall, callEnded, socketId } = call;
  const { receivingCall, callEnded, socketId } = call;

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setUpMedia();
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
      setShowRinging(true);
    });
  }, []);

  // call user fn
  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(userInfo, activeConversation?.users),
      picture: getConversationPicture(userInfo, activeConversation?.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(userInfo, activeConversation?.users),
        signal: data,
        from: socketId,
        name: userInfo?.name,
        picture: userInfo?.picture,
      });

      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      });
      peer.on("call accepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
      connectionRef.current = peer;
    });

    // setIsCallActive(true);

    // setIsChatScreenVisible(false);
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
      socket?.emit("answer call", { signal: data, to: call.socketId });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const setUpMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const enableMedia = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
      setShow(true);
    } catch (error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        // Handle permission denied error
        console.error("Camera permission denied.");
      } else {
        // Handle other errors
        console.error("Error accessing camera:", error);
      }
    }
  };
  return (
    <div>
      <button className="chat-button" onClick={handleButtonClick}>
        <BsChat />
      </button>
      {isModalOpen && !receivingCall && (
        <FriendsModal
          onClose={handleCloseModal}
          call={call}
          setCall={setCall}
          callUser={callUser}
        />
      )}

      {/* {call.name && ( */}

      <div
        className={(show || call?.signal) && !call.callEnded ? "" : "hidden"}
      >
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
        />
      </div>

      {showRinging && receivingCall && !callAccepted ? (
        <div className="fixed top-0 right-0 z-50">
          <Ringing call={call} setCall={setCall} answerCall={answerCall} />
        </div>
      ) : null}
      {/* )} */}
    </div>
  );
}

const ChatButtonWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatButton {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatButtonWithSocket;
