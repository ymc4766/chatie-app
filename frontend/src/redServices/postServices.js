import axios from "axios";
import { CATEGORY_URL, POSTS_URL } from "../redux/constants";

export const createPostsService = async (formData) => {
  const response = await axios.post(POSTS_URL, formData);
  return response.data;
};
// Get all products
export const getPostsService = async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
};

export const createCatgoryService = async (formData) => {
  const response = await axios.post(CATEGORY_URL, formData);
  return response.data;
};

export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data;
};

export const addLikePostService = async (id) => {
  const response = await axios.put(`${POSTS_URL}/post/like/${id}`);
  return response.data;
};
export const addDisLikePostService = async (postId) => {
  const response = await axios.put(`${POSTS_URL}/post/dislike/${postId}`);
  return response.data;
};
export const getPostDetDet = async (id) => {
  const response = await axios.get(`${POSTS_URL}/${id}`);
  return response.data;
};
