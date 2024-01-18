import React, { useEffect, useState } from "react";
import Ringing from "./Ringing";
import HeaderCall from "./HeaderCall";
import CallArea from "./CallArea";
import CallActions from "./CallActions";

const Call = ({ call, setCall, callAccepted, myVideo, userVideo, stream }) => {
  const { receivingCall, callEnded, name, picture } = call;

  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`fixed top-1/2 left-1/2 mt-[62px] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-20 rounded-2xl overflow-hidden callbg
        ${receivingCall && !callAccepted ? "hidden" : ""}
      }`}
      onMouseOver={() => setShowActions(true)}
      onMouseOut={() => setShowActions(false)}
    >
      {/* // call container  */}
      <div>
        <div>
          <HeaderCall />

          {/* // call area like ringing -- Info */}
          <CallArea name={name} />

          {/* call actions */}
          {showActions ? <CallActions /> : null}
        </div>

        {/* video streams */}
        <div>
          <div>
            <video
              ref={userVideo}
              playsInline
              muted
              autoPlay
              className="largeVideoCall"
            ></video>
          </div>
          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className={`smallVideoCall ${
                showActions ? "moveVideoCall" : ""
              } `}
            ></video>
          </div>
        </div>
      </div>

      {receivingCall && !callAccepted ? (
        <div className="bg-gray-700">
          <Ringing call={call} setCall={setCall} />
        </div>
      ) : null}
    </div>
  );
};

export default Call;
