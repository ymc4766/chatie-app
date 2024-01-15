// components/HomePage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./posts/PostCard";
import { getPosts } from "../redux/postSlice";
import { formatTimestamp } from "../utils/general";
import TopStory from "../components/TopStory";

const HomePage = () => {
  const [topPosts, setTopPosts] = useState([]);
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts) {
      const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
      const first4Posts = shuffledPosts.slice(0, 4);
      setTopPosts(first4Posts);
    }
  }, [posts]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4 sticky top-0">
        {" "}
        {/* Sidebar 25% */}
        {/* Your Sidebar content goes here */}
        Sidebar
      </div>

      <div className="w-1/2 p-4 overflow-y-auto px-3">
        {" "}
        {/* Middle div for posts 50% */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="w-1/4 bg-gray-100 p-4 sticky top-4 h-screen">
        {" "}
        <div className="hidden md:block  md:pl-4">
          <div className="trending-posts-container sticky top-[80px]">
            <div>
              <h3 className="text-lg font-bold py-1">Top Stories</h3>
              {topPosts?.map((post) => (
                <TopStory
                  key={post._id}
                  postId={post._id}
                  image={post.image}
                  title={post?.title}
                />
              ))}
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
              <div className="overflow-y-auto max-h-screen trending-posts-scroll scrollbar">
                {posts.map((post, index) => (
                  <div key={index} className="flex flex-col py-2">
                    <h3 className="font-bold text-[16px] text-blue-700 underline">
                      {post.title}
                    </h3>
                    <p>
                      {post.createdAt ? formatTimestamp(post.createdAt) : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
