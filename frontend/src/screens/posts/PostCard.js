// components/PostCard.js

import React from "react";
import { FaHeart, FaRetweet, FaEye, FaShare, FaStar } from "react-icons/fa";
import moment from "moment";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow hover:bg-gray-200 transition duration-300">
      <div className="flex flex-col py-1 mb-2">
        <div className="flex items-center">
          <img
            src={post.user.picture}
            alt={post.user.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <span className="font-bold">{post.user.name}</span>
            <p className="text-sm mb-[2px] text-slate-400">
              {moment(post?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="ml-4 py-2">
          <p>{post.description}</p>
        </div>
        <div>
          <img src={post.image ? post?.image : ""} alt="/" />
        </div>
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center mr-4">
          <FaHeart className="mr-1" />
          {post.likes.length}
        </div>
        <div className="flex items-center mr-4">
          <FaRetweet className="mr-1" />
          {post.reposts}
        </div>
        <div className="flex items-center mr-4">
          <FaEye className="mr-1" />
          {post.views.length}
        </div>
        <div className="flex items-center mr-4">
          <FaShare className="mr-1" />
          {post.shares}
        </div>
        <div className="flex items-center">
          <FaStar className="mr-1" />
          {post.favorites}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
