import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessage, getConversations } from "../redux/chatSlice";
import Conversations from "../ConversationScreens/Conversations";

import ChatHeader from "../header/ChatHeader";
import SearchResults from "../Search/SearchResults";
import Search from "../Search/Search";
import ChatScreen from "../ChatScreens/ChatScreen";
import SocketContext from "../Context/SocketContext";

import { useNavigate } from "react-router-dom";

function FriendsModal({
  onClose,
  socket,
  onlineUsers,
  typing,
  callUser,
  call,
}) {
  // You can fetch the list of friends and their details here
  // const [showRinging, setShowRinging] = useState(false); // Add this state
  const dispatch = useDispatch();
  // const { callEnded, receivingCall } = call;

  const { userInfo } = useSelector((state) => state.auth);
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

  // const [typing, setTyping] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [isChatScreenVisible, setIsChatScreenVisible] = useState(false);
  // const [onlineUsers, setOnlineUsers] = useState([]); // State to store online users
  const navigate = useNavigate();

  useEffect(() => {}, [navigate]);
  const handleCloseChatScreen = () => {
    if (call) {
      setIsChatScreenVisible(false);
    }
    // Additional logic you may want to perform when closing the chat screen
    setIsChatScreenVisible(false);
  };

  // ....

  return (
    <>
      <div
        className=" fixed inset-1 bg-black opacity-30 "
        onClick={onClose}
      ></div>
      <div
        className="fixed bottom-0  right-4 p-0 mb-4 bg-white border border-gray-300 shadow-md
       w-[90%] md:w-1/3 h-[80%] overflow-y-auto dark:bg-dark_bg_1 sm:px-4 z-10 "
      >
        {/* <button
          className="absolute top-1 right-2  text-lg font-bold mb-2 "
          onClick={onClose}
        >
          <CloseIcon className="text-gray-100" />
        </button> */}
        <div className="mt-1">
          {isChatScreenVisible && activeConversation._id ? (
            <div className="">
              <ChatScreen
                onClose={handleCloseChatScreen}
                onlineUsers={onlineUsers}
                typing={typing}
                call={call}
                callUser={callUser}
              />
            </div>
          ) : (
            <>
              <ChatHeader />
              <Search
                searchLength={searchResults.length}
                setSearchResults={setSearchResults}
              />
              <div className="mt-1">
                {searchResults.length > 0 ? (
                  <SearchResults
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    setIsChatScreenVisible={setIsChatScreenVisible}
                    typing={typing}
                  />
                ) : (
                  <>
                    {/* conversation */}
                    <Conversations
                      setIsChatScreenVisible={setIsChatScreenVisible}
                      typing={typing}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {/* {!isChatScreenVisible && ( */}
        {/* <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          userVideo={userVideo}
          myVideo={myVideo}
          stream={stream}
        /> */}
        {/* )} */}
      </div>
    </>
  );
}

const FriendsModalWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <FriendsModal {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default FriendsModalWithSocket;
