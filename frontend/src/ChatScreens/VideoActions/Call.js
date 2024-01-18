import React, { useState } from "react";
import Ringing from "./Ringing";
import HeaderCall from "./HeaderCall";
import CallArea from "./CallArea";
import CallActions from "./CallActions";

const Call = ({ call, setCall, callAccepted, myVideo, userVideo, stream }) => {
  const { receivingCall, callEnded } = call;

  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`fixed top-1/2 md:mt-[60px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-30 rounded-2xl overflow-hidden  callbg`}
      onMouseOver={() => setShowActions(true)}
      onMouseOut={() => setShowActions(false)}
    >
      {/* // call container  */}
      <div>
        <div>
          <HeaderCall />

          {/* // call area like ringing -- Info */}
          <CallArea name="yusuf moh " />

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
            />
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

      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Call;
