import moment from "moment";
import React from "react";
import TraingleIcon from "../svg/TriangeIcon";

const Messages = ({ message, me, typing }) => {
  return (
    <div
      className={`w-[100%] flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end " : ""
      }`}
    >
      {/* Message Container */}
      <div
        className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg
      ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}
      `}
      >
        {/* Message */}
        <p
          className="float-left h-full text-md pb-4 pr-8"
          style={{ wordWrap: "break-word", maxWidth: "45ch" }}
        >
          {message.message}
        </p>{" "}
        {/* Message Date */}
        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
          {moment(message.createdAt).format("HH:mm:ss")}
        </span>
        {/* <span>{typing ? "typing" : ""}</span> */}
        {!me && (
          <TraingleIcon
            className="dark:fill-dark_bg_2 rotate-[60deg] absolute
       top-[-5px] -left-1.5"
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
