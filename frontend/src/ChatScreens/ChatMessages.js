import React, { useEffect, useRef } from "react";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);

  const endMsg = useRef();
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
            />
          ))}
        <div className="mt-2" ref={endMsg}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
