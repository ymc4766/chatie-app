import React, { useEffect, useState } from "react";
import CloseIcon from "../../svg/Close";
import { RiCheckFill, RiPassValidFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import ringing1 from "./audio/ringing_phone1.mp3";
import ringing2 from "./audio/public_audio_ringing.mp3";

const Ringing = ({ call, endCall, setCall, answerCall }) => {
  const { receivingCall, callEnded, name, picture } = call;

  const [timer, setTimer] = useState(0);
  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer < 30) {
      handleTimer();
    } else {
      setCall({ ...call, receivingCall: false });
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="ringing-dev  dark:bg-dark_bg_2 rounded-lg fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
      {/*Container*/}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/*Call infos*/}
        <div className="flex items-center gap-x-2">
          <img
            src={picture}
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>
        {/*Call actions*/}
        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <FaCheck className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/* // ringing */}

      <audio src={ringing2} autoPlay loop></audio>
    </div>
  );
};

export default Ringing;
