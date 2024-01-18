import React, { useEffect, useState } from "react";
import CloseIcon from "../../svg/Close";
import { RiCheckFill, RiPassValidFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import ringing1 from "./audio/ringing_phone1.mp3";
import ringing2 from "./audio/public_audio_ringing.mp3";

const Ringing = ({ call, setCall }) => {
  const { receivingCall, callEnded } = call;

  const [timer, setTimer] = useState(0);
  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer < 5) {
      handleTimer();
    } else {
      setCall({ ...call, receivingCall: false });
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div
      className="dark:bg-dark_bg_1  rounded-lg fixed  top-1/2 left-1/2  -translate-x-1/2 
     -translate-y-1/2 shadow-lg z-30"
    >
      <div className="p-4 gap-4 flex items-center justify-between gap-x-8">
        {/* // call Infos  */}
        <div className=" flex items-center  gap-x-2 ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            alt=""
            className="w-28 h-28 rounded-full"
          />
          <div className="dark:text-slate-200">
            <h1>YUsuf moh</h1>
            <span className="dark:text-slate-400"> WhatsApp Video ....</span>
          </div>
        </div>

        {/* call actions  */}
        <ul className="flex items-center gap-x-3">
          <li>
            <button className="w-8 h-8 p-1 flex items-center justify-center rounded-full bg-red-600 ">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li>
            <button className="w-8 h-8 p-1 flex items-center justify-center rounded-full bg-blue-600 ">
              <FaCheck className="fill-white w-9 " />
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
