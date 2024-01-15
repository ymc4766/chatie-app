import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDet, setPostDetails } from "../../redux/postSlice";
import { FaThumbsUp, FaThumbsDown, FaEye } from "react-icons/fa";
import moment from "moment";
import Loader from "../../components/Loader";

const PostDetails = () => {
  const { id: postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localNumViews, setLocalNumViews] = useState(0);

  const { post, posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (post?.numViews) {
      setLocalNumViews(post.numViews.length);
    }
  }, [post?.numViews]);
  console.log(post);

  useEffect(() => {
    dispatch(getPostDet(postId));
  }, [dispatch, postId, localNumViews]);

  return (
    <div className="container mx-auto mt-8 p-4">
      {isLoading && <Loader />}
      {/* {isError && <p>Error: {message}</p>} */}
      {post && (
        <>
          {/* Post Detail */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <img
              src={post.image}
              alt={post.title}
              className="mb-2 w-full h-[500px] object-cover p-2"
            />
            <p className="text-base leading-6 text-[21px] font-semibold text-gray-700">
              {post?.description}
            </p>

            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center space-x-1">
                <FaThumbsUp className="text-blue-500" />
                <span className="text-gray-600">{post.likes?.length}</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <FaThumbsDown className="text-red-500" />
                <span className="text-gray-600">{post.disLikes?.length}</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <FaEye className="text-green-500" />
                <span className="text-gray-900">
                  {console.log(post.numViews)}
                  {localNumViews}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              Published on {moment(post.createdAt).format("MMMM DD, YYYY")} by{" "}
              {post.user.name}
            </p>
          </div>

          {/* Widget */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Widget</h2>
            {/* Include your widget content here */}
          </div>

          {/* Related Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
            {/* Include your related posts content here */}
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
