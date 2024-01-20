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

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  picture: "",
};
function ChatButton({ socket }) {
  const dispatch = useDispatch();

  const { activeConversation } = useSelector((state) => state.chat);

  const { userInfo } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [call, setCall] = useState(callData);
  const [show, setShow] = useState(false);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showRinging, setShowRinging] = useState(false);
  const { receivingCall, callEnded, socketId } = call;

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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
  }, [dispatch, userInfo]);
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
      // setModalOpen(false);
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

  //--end call  funcion
  const endCall = () => {
    setShow(false);
    setShowRinging(false);
    setCall({ ...call, callEnded: true, receivingCall: false });
    myVideo.current.srcObject = null;
    socket.emit("end call", call.socketId);
    connectionRef?.current?.destroy();
  };

  const setUpMedia = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const enableMedia = async () => {
    try {
      let currentStream = await navigator.mediaDevices.getUserMedia({
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
  //get Conversations
  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getConversations(userInfo.token));
    }
  }, [userInfo]);

  return (
    <div>
      <button className="chat-button" onClick={handleButtonClick}>
        <BsChat />
      </button>
      {isModalOpen && !receivingCall && (
        <FriendsModal
          onClose={handleCloseModal}
          onlineUsers={onlineUsers}
          typing={typing}
          call={call}
          setCall={setCall}
          callUser={callUser}
          callAccepted={callAccepted}
        />
      )}

      {/* {call.name && ( */}

      <div className={(show || call.signal) && !callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          endCall={endCall}
        />
      </div>

      {receivingCall && !callAccepted ? (
        <div className=" ">
          <Ringing
            call={call}
            setCall={setCall}
            answerCall={answerCall}
            endCall={endCall}
          />
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
