import React from "react";

const CallArea = ({ name, picture }) => {
  return (
    <div className="absolute top-16 z-40 w-full p-1">
      <div className="flex  flex-col items-center ">
        <div className="flex  flex-col  items-center  gap-y-1">
          <img
            src={picture}
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <h1 className="text-slate-300 text-lg uppercase ">
            {name ? name : ""}
          </h1>
          <span className="text-slate-400">Ringing .....</span>
          <span className="text-slate-500 text-sm">20:15 </span>
        </div>
      </div>
    </div>
  );
};

export default CallArea;
