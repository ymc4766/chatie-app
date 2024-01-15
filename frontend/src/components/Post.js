import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaEye, FaComment } from "react-icons/fa";

import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Post component for individual posts
const Post = ({
  postId,
  title,
  description,
  imageUrl,
  author,
  createdAt,
  likes,
  disLikes,
  views,
  addPostLikeHandler,
  addPostDislikeHandler,
}) => {
  // const likes = 123;
  // const dislikes = 10;
  // const views = 456;
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Add your comment handling logic here

  // const { likes, disLikes } = useSelector((state) => state.posts);

  return (
    <div className="p-4 mb-4 shadow-md">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2 py-1">
          <img
            src={imageUrl}
            alt={title}
            className="w-12 h-12 object-cover rounded-full"
          />

          <div>
            <p className="text-sm text-gray-600">{author}</p>
            <p className="text-sm mb-[2px] text-slate-400">
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>{" "}
        <button className="px-3 p-2 bg-blue-600 rounded-2xl">Follow</button>
      </div>
      <Link to={`/post/${postId}`}>
        <img
          src={imageUrl}
          alt={title}
          className="mb-2 w-full h-[400px] object-cover"
        />
      </Link>
      <h2 className="text-xl font-bold mb-2 hover:underline cursor-pointer">
        <Link to={`/post/${postId}`}> {title}</Link>
      </h2>
      <p>{description}</p>

      {/* Comment input */}
      {showCommentInput && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={() => {
              // Add your comment handling logic here
              console.log("Add comment:", comment);
              setComment(""); // Clear the comment input after adding comment
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Comment
          </button>
        </div>
      )}

      {/* Like, Dislike, and Views */}
      <div className="flex items-center mt-4 space-x-4">
        <div className="flex items-center space-x-1">
          <FaThumbsUp onClick={addPostLikeHandler} className="text-blue-500" />
          <span className="text-gray-600">({likes ? likes : 0})</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaThumbsDown
            onClick={addPostDislikeHandler}
            className="text-red-500"
          />
          <span className="text-gray-600">({disLikes ? disLikes : 0})</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaEye className="text-green-500" />
          <span className="text-gray-600">{views ? views : 0}</span>
        </div>
        {/* Comment toggle button */}
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={() => {
            setShowCommentInput(!showCommentInput);
            setShowComments(false); // Hide comments when toggling comment input
          }}
        >
          <FaComment className="text-gray-600" />
          <span className="text-gray-600">Comments</span>
        </div>
      </div>

      {/* Display comments */}
      {showComments && (
        <div className="mt-4">
          {/* Add your comment display logic here */}
          {/* For example, map through the comments and display them */}
          {/* {comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p>{comment.author}</p>
            <p>{comment.text}</p>
          </div>
        ))} */}
        </div>
      )}
    </div>
  );
};
export default Post;
