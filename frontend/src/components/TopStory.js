import React from "react";
import { Link } from "react-router-dom";

const TopStory = ({ title, timestamp, postId }) => (
  <div className="mb-4">
    <h2 className="text-xl font-bold mb-2 underline text-gray-600">
      <Link to={`/post/${postId}`}>{title}</Link>
    </h2>
    {/* Display timestamp or any other relevant information */}
    <p className="text-sm text-gray-500">Published: {timestamp}</p>
  </div>
);

export default TopStory;
