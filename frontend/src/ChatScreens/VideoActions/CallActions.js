import React from "react";
import ArrowIcon from "../../svg/Arrow";
import SpeakerIcon from "../../svg/Speaker";
import VideoDialIcon from "../../svg/VideoDial";
import { IoVolumeMuteSharp } from "react-icons/io5";
import DialIcon from "../../svg/Dial";
import { BsMicMute } from "react-icons/bs";

const CallActions = () => {
  return (
    <div className="h-22  w-full absolute bottom-0 z-40 px-1">
      {/* //container  */}
      <div className="relative bg-[#222] px-4 pt-6 pb-12 rounded-xl">
        {/* expand Icon  */}
        <button className="-rotate-90  scale-y-[300%] absolute top-1 left-1/2">
          <ArrowIcon className="fill-white" />
        </button>
        {/* actions  */}
        <ul className="flex items-center justify-between">
          <li>
            <button className="btn_secondary">
              <SpeakerIcon className="fill-white w-5" />
            </button>
          </li>
          <li>
            <button className="btn_secondary">
              <VideoDialIcon className="fill-white w-14 mt-1.5" />
            </button>
          </li>
          <li>
            <button className="btn_secondary">
              <BsMicMute className="fill-white " size={24} />
            </button>
          </li>
          <li>
            <button className="btn_secondary rotate-[135deg]">
              <DialIcon className="fill-white w-5 " />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallActions;
