import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DotsIcon from "../svg/Dots";
import SearchLargeIcon from "../svg/SearchLarge";
import { RiArrowGoBackLine } from "react-icons/ri";
import {
  checkUserOnline,
  getConversationName,
  getConversationPicture,
} from "../utils/chatWithUser";

// import { VideoCallIcon } from "../../svg";

const ChatUserHeader = ({ onClose, onlineUsers }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;

  // useEffect(() => {}, [activeConversation, name, picture]);
  let isUserOnline = checkUserOnline(
    onlineUsers,
    userInfo,
    activeConversation?.users
  );
  useEffect(() => {
    // Use the checkUserOnline function to check if the user is online
  }, [userInfo, activeConversation, onlineUsers]);

  return (
    <div className="sticky top-0 z-40 h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/*Container*/}
      <div className="w-full flex items-center justify-between">
        {/*left*/}
        <div className="flex items-center gap-x-4">
          {/*Conversation image*/}
          <button className="btn">
            <img
              src={
                picture
                  ? getConversationPicture(userInfo, activeConversation?.users)
                  : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
              }
              alt="/"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/*Conversation name and online status*/}
          <div className="flex flex-col ">
            <h1 className="dark:text-white text-md font-bold">
              {getConversationName(userInfo, activeConversation?.users)}
            </h1>
            <span className="text-sm dark:text-dark_svg_1">
              {isUserOnline ? "Online" : ""}
            </span>
          </div>
        </div>
        {/*Right*/}

        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn" onClick={onClose}>
              <RiArrowGoBackLine className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatUserHeader;
