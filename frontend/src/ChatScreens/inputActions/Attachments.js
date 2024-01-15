import React, { useState } from "react";
// import AttachMenu from "./AttachMenu";
import AttachmentIcon from "../../svg/Attachment";

const Attachments = ({ showAttachment, setShowAttachment, setShowPicker }) => {
  // const [show, showMenu] = useState(false);
  return (
    <li className="">
      <button
        onClick={() => {
          setShowPicker(false);
          setShowAttachment((prev) => !prev);
        }}
        className="btn"
        type="button"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* {showAttachment ? <AttachMenu /> : null} */}
    </li>
  );
};

export default Attachments;
