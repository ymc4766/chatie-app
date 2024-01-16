import React, { useState } from "react";
import SocketContext from "../../Context/SocketContext";
import { useSelector } from "react-redux";

function ChatInput({ message, setMessage, textRef, socket }) {
  const [typing, setTyping] = useState(false);

  const { activeConversation } = useSelector((state) => state.chat);
  const changeHandler = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      setTyping(true);

      socket.emit("typing", activeConversation._id);
    }

    let lastTypingTime = new Date().getTime();
    let timer = 2000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDif = timeNow - lastTypingTime;

      if (timeDif >= timer && typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="type a message"
        ref={textRef}
        value={message}
        onChange={changeHandler}
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
      />
    </div>
  );
}

const ChatInputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatInput {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatInputWithSocket;
