import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { getCategories } from "../../redux/categorySlice";
import { createPost, getPosts } from "../../redux/postSlice";

const { Option } = Select;

const CreatePost = ({ showModal, closeModal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const { isLoading, refetch } = useSelector((state) => state?.posts);
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state?.category);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].title); // Set the default category, adjust this based on your data structure
    }
  }, [categories]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image); // Append the image file

    dispatch(createPost(formData))
      .then(() => {
        closeModal();
        navigate("/");
        setTitle("");
        setDescription("");
        setImage(null);
        // Refetch posts after creating a new post
        dispatch(getPosts());
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Handle errors more gracefully
      });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Transition show={showModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto py-10"
        onClose={closeModal}
      >
        <div className="flex flex-col justify-center min-h-screen px-10">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white p-6 w-full max-w-xl mx-auto rounded-md">
              <h3 className="text-2xl font-bold md:text-3xl">CREATE POST</h3>
              <form className="w-full mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-900 uppercase"
                    >
                      TITLE
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add Title Post"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-900 uppercase"
                    >
                      IMAGE
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-900 uppercase"
                    >
                      DESCRIPTION
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 p-2.5 w-full border text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add Description of Post"
                    />
                  </div>
                </div>

                <div className="w-full  px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                    htmlFor="category"
                  >
                    CATEGORY
                  </label>
                  <Select
                    style={{ width: "100%" }}
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    {categories?.map((cat) => (
                      <Option key={cat._id} value={cat.title}>
                        {cat.title}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-6 bg-violet-700 p-2 rounded-lg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {isLoading ? <Loader /> : "TWEET"}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePost;
