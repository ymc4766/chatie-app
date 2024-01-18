import React from "react";
import ArrowIcon from "../../svg/Arrow";
import { FaLock } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";

const HeaderCall = () => {
  return (
    <header className="absolute top-0 w-full z-40">
      <div className="flex items-center justify-between p-1 ">
        <button className="btn">
          <span className="rotate-180 scale-150">
            <ArrowIcon className="fill-white" />
          </span>
        </button>

        <p className="flex items-center">
          <FaLock className="fill-white  " />
          <span className="text-sm text-slate-300 space-x-2">
            {" "}
            E TO E - Encrypted
          </span>
        </p>
        <p>
          <IoMdContacts className="fill-white " size={21} />
        </p>
      </div>
    </header>
  );
};

export default HeaderCall;
