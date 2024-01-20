import React from "react";
import { formatTimestamp } from "../utils/general";
import { useSelector } from "react-redux";
import TopStory from "../components/TopStory";

const Widget = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <div className="hidden md:block  md:pl-4">
      <div className="trending-posts-container sticky top-[80px]">
        <div>
          <h3 className="text-lg font-bold py-1">Top Stories</h3>
          {posts?.map((post) => (
            <TopStory
              key={post._id}
              postId={post._id}
              image={post.image}
              title={post?.title}
            />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
        <div className="overflow-y-auto max-h-screen trending-posts-scroll scrollbar">
          {posts.map((post, index) => (
            <div key={index} className="flex flex-col py-2">
              <h3 className="font-bold text-[16px] text-blue-700 underline">
                {post.title}
              </h3>
              <p>{post.createdAt ? formatTimestamp(post.createdAt) : ""}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
