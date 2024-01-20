import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { BsChat } from "react-icons/bs";

import "../styles/tweetButton.css";
import CreatePost from "../screens/posts/CreatePost";
import { getPosts } from "../redux/postSlice";
import { useDispatch } from "react-redux";

const CreatePostButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const openModel = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    dispatch(getPosts());
  };
  return (
    <>
      <div className=" space-x-4 ">
        <button className="create-post-button" onClick={openModel}>
          <FaPen />
        </button>
      </div>

      <CreatePost showModal={isModalVisible} closeModal={closeModal} />
    </>
  );
};

export default CreatePostButton;
