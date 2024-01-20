import React, { useEffect, useState } from "react";
import ringing1 from "../../audio/ringing_phone1.mp3";

import HeaderCall from "./HeaderCall";
import CallArea from "./CallArea";
import CallActions from "./CallActions";

const Call = ({
  call,

  myVideo,
  userVideo,
  callAccepted,
  stream,
  endCall,
}) => {
  const { receivingCall, callEnded, name, picture } = call;
  const [toggle, setToggle] = useState(false);
  // console.log("name picture call ....", call);

  const [showActions, setShowActions] = useState(false);
  // ${receivingCall && !callAccepted ? "hidden" : ""}

  return (
    <div
      className={`fixed top-1/2 left-1/2 mt-[62px] -translate-x-1/2 
      -translate-y-1/2 w-[350px] h-[550px] z-20 rounded-2xl overflow-hidden callbg    
      ${receivingCall && !callAccepted ? "hidden" : ""}`}
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
          {showActions ? <CallActions endCall={endCall} /> : null}
        </div>

        {/* video streams */}
        <div>
          {callAccepted && !callEnded ? (
            <div>
              <video
                ref={userVideo}
                playsInline
                muted
                autoPlay
                className={toggle ? "smallVideoCall" : "largeVideoCall"}
                onClick={() => setToggle((prev) => !prev)}
              ></video>
            </div>
          ) : null}

          {stream ? (
            <div>
              <video
                ref={myVideo}
                playsInline
                muted
                autoPlay
                className={`${toggle ? "largeVideoCall" : "smallVideoCall"} ${
                  showActions ? "moveVideoCall" : ""
                } `}
                onClick={() => setToggle((prev) => !prev)}
              ></video>
            </div>
          ) : null}
        </div>
      </div>

      {/* {receivingCall && !callAccepted ? (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      ) : null} */}

      {receivingCall && !callAccepted && !callEnded ? (
        <div className="">
          <audio src={ringing1} autoPlay loop></audio>
        </div>
      ) : null}
    </div>
  );
};

export default Call;
