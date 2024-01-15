import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import axios from "axios";
import {
  addDisLikePostService,
  addLikePostService,
  createPostsService,
  getPostsService,
  getPostDetDet,
} from "../redServices/postServices";

const initialState = {
  post: null,

  posts: [],
  likes: [],
  disLikes: [],
  numViews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// postSlice.js
export const updatePost = createAction("posts/updatePost");

export const createPost = createAsyncThunk(
  "posts/create",
  async (formData, thunkAPI) => {
    try {
      return await createPostsService(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      return await getPostsService();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getPostDet = createAsyncThunk(
  "post/detail",
  async (id, thunkAPI) => {
    try {
      return await getPostDetDet(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likePost = createAsyncThunk("post/like", async (id, thunkAPI) => {
  try {
    return await addLikePostService(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const disLikePost = createAsyncThunk(
  "post/dislike",
  async (postId, thunkAPI) => {
    try {
      return await addDisLikePostService(postId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostLikes: (state, action) => {
      const { postId, likes } = action.payload;
      state.likes[postId] = likes;
    },
    setPostDetails: (state, action) => {
      // Check if the user has already viewed the post
      const { post } = action.payload;

      const hasViewed =
        state.post?.numViews && Array.isArray(state?.post?.numViews)
          ? state?.post?.numViews.some((userId) => userId === post.user._id)
          : false;

      if (!hasViewed) {
        // Update numViews only if the user hasn't viewed the post before
        state.post = {
          ...post,
          numViews: [...post?.numViews, post.user._id],
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.posts = action.posts;
        toast.success("Post added successfully");
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getPostDet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostDet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.post = action.payload;
      })
      .addCase(getPostDet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost, (state, action) => {
        const { postId, likes, disLikes } = action.payload;
        state.likes[postId] = likes;
        state.disLikes[postId] = disLikes;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.likes = action.payload;
        // dispatch(setPostLikes(action.payload.likes));

        // const { postId, likes } = action.payload;
        // state.likes[postId] = likes;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(disLikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disLikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.disLikes = action.payload;

        // const { postId, disLikes } = action.payload;
        // state.disLikes[postId] = disLikes;
        // consdole.log(action.payload);
        // state.disLikes = action.payload.disLikes;
      })
      .addCase(disLikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setPostLikes, setPostDetails } = postSlice.actions;
export default postSlice.reducer;
