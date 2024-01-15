import React, { useEffect, useState } from "react";
import EmojiIcon from "../../svg/Emoji";
import EmojiPicker from "emoji-picker-react";
import CloseIcon from "../../svg/Close";

const EmojiPickers = ({
  textRef,
  message,
  setMessage,
  showPicker,
  setShowPicker,
  setShowAttachment,
}) => {
  const [cursorPossition, setCursorPossition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPossition;
  }, [cursorPossition]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);

    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPossition(start.length + emoji.length);
  };

  return (
    <li>
      <button
        className="btn custom-emoji-icon"
        type="button"
        onClick={() => {
          setShowAttachment(false);
          setShowPicker((prev) => !prev);
        }}
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>

      {showPicker ? (
        <div className="emojiPickerAnimation absolute bottom-[60px] ">
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  );
};

export default EmojiPickers;
