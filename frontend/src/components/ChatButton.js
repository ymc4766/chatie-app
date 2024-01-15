import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import FriendsModal from "../screens/FriendsModal";
import "../styles/tweetButton.css";

const ChatButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button className="chat-button" onClick={handleButtonClick}>
        <BsChat />
      </button>
      {isModalOpen && <FriendsModal onClose={handleCloseModal} />}
    </div>
  );
};

export default ChatButton;
