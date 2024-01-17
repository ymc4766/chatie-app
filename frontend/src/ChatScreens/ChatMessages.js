import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import Typing from "./inputActions/Typing";
const ChatMessages = ({ typing }) => {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);

  const endMsg = useRef();
  const typingIconRef = useRef();

  const scrollBtm = () => {
    endMsg.current.scrollIntoView({ bahavior: "smooth" });
  };

  //   const handleScroll = (e) => {
  //     const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  //     const atBottom = scrollHeight - scrollTop === clientHeight;
  //     if (atBottom) {
  //       scrollBtm();
  //     }
  //   };

  useEffect(() => {
    scrollBtm();
  }, [messages]);

  // useEffect(() => {
  //   // Add bounce animation to the icon
  //   if (typing && typingIconRef.current) {
  //     typingIconRef.current.classList.add("bounce");
  //   } else {
  //     typingIconRef.current?.classList.remove("bounce");
  //   }
  // }, [typing]);

  return (
    <div
      className="mb-[60px] 
    bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqdNzmQhfUciSCYk4r6fPaGVYWc_gKY1xoGXenI705Jh-zENb1U8u_QQAvD-IaWnk3sZc&usqp=CAU')]
     "
    >
      {/*Container*/}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%] ">
        {messages &&
          messages.map((message) => (
            <Messages
              message={message}
              key={message._id}
              me={userInfo._id === message.sender._id}
              // typing={typing}
            />
          ))}
        <div className="mb-8">
          {typing === activeConversation._id ? <Typing /> : ""}
        </div>
        <div className="mt-2" ref={endMsg}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
