import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { dateHandler } from "../utils/dateHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationMessage,
  open_create_conversations,
  updateMessages,
} from "../redux/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chatWithUser";
import { useNavigate } from "react-router-dom";
import SocketContext from "../Context/SocketContext";
import Typing from "../ChatScreens/inputActions/Typing";

function Conversation({
  convo,
  setIsChatScreenVisible,
  socket,
  online,
  typing,
}) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { activeConversation } = useSelector((state) => state.chat);
  const { token } = userInfo;
  const navigate = useNavigate();
  const values = {
    receiver_id: getConversationId(userInfo, convo.users),
    token,
  };
  // useEffect(() => {
  //   // Join the conversation room when the component mounts
  //   if (activeConversation?._id) {
  //     socket.emit("joinConvoRoom", activeConversation?._id);
  //     dispatch(getConversationMessage(values));
  //   }

  //   // Clean up the room on component unmount
  // }, [activeConversation, socket]);

  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversations(values));
    socket.emit("joinConvoRoom", newConvo?.payload?._id);
    setIsChatScreenVisible(true);
  };

  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] w-full dark:bg-dark_bg_1  cursor-pointer hover:dark:bg-dark_bg_2 px-[10px]"
    >
      <div className="relative w-full flex items-center justify-between  py-[10px]">
        {/* left  */}
        <div className="flex items-center gap-x-3  ">
          {/* conversation user pic  */}

          <div
            className={`relative  min-w-[50px] max-w-[50px] h-[50px]  rounded-full
           overflow-hidden`}
          >
            <img
              src={
                convo.picture
                  ? getConversationPicture(userInfo, convo.users)
                  : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
              }
              className="w-full h-full"
              alt=""
            />
          </div>
          {/* conversation name and pic / */}
          <div className="w-full flex  flex-col">
            {/* conversation name ..  */}
            <div className="flex items-center">
              <h1 className="font-bold  flex items-center  gap-x-2 text-slate-400">
                {getConversationName(userInfo, convo.users)}
              </h1>
              <p className="text-slate-200 space-x-1">
                {online ? <GoDotFill className="text-green-700" /> : ""}
              </p>
            </div>

            {/* conversation message */}
            <div className="">
              <div className="flex items-center  gap-x-1  dark:text-slate-100">
                <div className="flex-1 items-center gap-x-1  dark:text-slate-500">
                  {typing === convo._id ? (
                    <Typing />
                  ) : (
                    <p>
                      {convo.latestMessage?.message.length > 25
                        ? `${convo.latestMessage?.message.substring(0, 25)}...`
                        : convo.latestMessage?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="flex  flex-col gap-y-4  items-end  text-xs">
          <span className="dark:text-slate-600">
            {convo.latestMessage?.createdAt &&
              moment(convo.latestMessage?.createdAt).fromNow(true)}
          </span>
        </div>
      </div>

      {/* border  */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithSocket;
