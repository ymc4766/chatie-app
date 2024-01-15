import React from "react";

const ChatInput = ({ message, setMessage, textRef }) => {
  const changeHandler = (e) => {
    setMessage(e.target.value);
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
};

export default ChatInput;
