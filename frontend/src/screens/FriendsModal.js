// FriendsModal.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/chatSlice";
import Conversations from "../ConversationScreens/Conversations";
import CloseIcon from "../svg/Close";
import ChatHeader from "../header/ChatHeader";
import SearchResults from "../Search/SearchResults";
import Search from "../Search/Search";
import ChatScreen from "../ChatScreens/ChatScreen";
import { Outlet, useNavigate } from "react-router-dom";
import SocketContext from "../Context/SocketContext";

function FriendsModal({ onClose, socket }) {
  // You can fetch the list of friends and their details here
  const [searchResults, setSearchResults] = useState([]);
  const [isChatScreenVisible, setIsChatScreenVisible] = useState(false);

  const navigate = useNavigate();
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [navigate]);
  const handleCloseChatScreen = () => {
    setIsChatScreenVisible(false);
    // Additional logic you may want to perform when closing the chat screen
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(getConversations(userInfo.token));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <div
        className=" fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div
        className="fixed bottom-0  right-4 p-0 mb-4 bg-white border border-gray-300 shadow-md
       w-full md:w-1/3 h-[80%] overflow-y-auto dark:bg-dark_bg_1  "
      >
        {/* <button
          className="absolute top-1 right-2  text-lg font-bold mb-2 "
          onClick={onClose}
        >
          <CloseIcon className="text-gray-100" />
        </button> */}
        <div className="mt-1">
          {isChatScreenVisible && activeConversation._id ? (
            <ChatScreen onClose={handleCloseChatScreen} />
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
                  />
                ) : (
                  <>
                    {/* conversation */}
                    <Conversations
                      setIsChatScreenVisible={setIsChatScreenVisible}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
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
