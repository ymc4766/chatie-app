import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

import Post from "../components/Post";
import TopStory from "../components/TopStory";
import { useDispatch, useSelector } from "react-redux";
import { disLikePost, getPosts, likePost } from "../redux/postSlice";
import Testimonial from "../components/Trending";
import Loader from "../components/Loader";
import SocketContext from "../Context/SocketContext";
import { formatTimestamp } from "../utils/general";
import { getConversationMessage, updateMessages } from "../redux/chatSlice";
import Ringing from "../ChatScreens/VideoActions/Ringing";
import Call from "../ChatScreens/VideoActions/Call";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chatWithUser";

function Home({ socket }) {
  // console.log("sckthome", socket);

  const dispatch = useDispatch();
  const [showRinging, setShowRinging] = useState(false); // Add this state
  // const [call, setCall] = useState(callData);
  const { activeConversation } = useSelector((state) => state.chat);

  const { userInfo } = useSelector((state) => state.auth);
  const { posts, likes, disLikes, isLoading } = useSelector(
    (state) => state.posts
  );

  const [topPosts, setTopPosts] = useState([]);
  const [fetchPosts, setFetchPosts] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (posts) {
      const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
      const first4Posts = shuffledPosts.slice(0, 4);
      setTopPosts(first4Posts);
    }
  }, [posts]);

  useEffect(() => {
    if (posts) {
      const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
      const first6Posts = shuffledPosts.slice(0, 6);
      setFetchPosts(first6Posts);
    }
  }, [posts]);

  const addPostLikeHandler = (postId) => {
    dispatch(likePost(postId));
  };

  const addPostDislikeHandler = (postId) => {
    dispatch(disLikePost(postId));
  };

  useEffect(() => {
    socket.emit("join", userInfo?._id);
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
      // console.log("online users", users);
    });
  }, [userInfo]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, likes, disLikes]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-12">
      <div className="container mx-auto mt-8 md:flex md:px-5">
        {/* Posts */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
            {fetchPosts?.map((post) => (
              <div key={post._id} className="w-full mb-8">
                <Post
                  key={post._id}
                  postId={post._id}
                  title={post.title}
                  description={post.description}
                  imageUrl={post.image}
                  author={post.user.name}
                  likes={post?.likes?.length}
                  disLikes={post?.disLikes?.length}
                  createdAt={post.createdAt}
                  views={post?.numViews?.length}
                  addPostLikeHandler={() => addPostLikeHandler(post._id)}
                  addPostDislikeHandler={() => addPostDislikeHandler(post._id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Widget */}
        <div className="hidden md:block md:w-[30%] md:pl-4">
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
                {posts?.map((post, index) => (
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
      <div className="mx-auto max-w-3xl mt-8">
        <h3 className="text-2xl font-bold mb-4">Testin... News</h3>
        <div>
          {posts?.map((post) => (
            <Testimonial
              key={post._id}
              title={post.user.name}
              description={post.title}
              image={post.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
// export default HomeScreen;

export default HomeWithSocket;
