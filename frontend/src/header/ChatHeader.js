import React, { useState } from "react";
import { useSelector } from "react-redux";
// import Menu from "./Menu";
import CommunityIcon from "../svg/Community";
import StoryIcon from "../svg/Story";
import ChatIcon from "../svg/Chat";
import DotsIcon from "../svg/Dots";
const ChatHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className=" h-[50px] dark:bg-dark_bg_2 flex items-center p16 px-3 m-3">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="btn">
            <img
              src={
                userInfo?.picture
                  ? userInfo?.picture
                  : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
              }
              alt={userInfo?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          <p className="text-slate-300 uppercase">{userInfo?.name}</p>
        </div>

        <ul className="flex items-center gap-x-2 5">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="relative" onClick={() => setShowMenu((prev) => !prev)}>
            <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
            {/* {showMenu ? <Menu /> : null} */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
