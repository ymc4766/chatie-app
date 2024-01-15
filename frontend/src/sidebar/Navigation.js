import React, { useState } from "react";
import {
  RiHome2Line,
  RiNewspaperLine,
  RiEarthLine,
  RiBuildingLine,
  RiTrendingUpLine,
  RiArrowRightSLine,
  RiMenuLine,
  RiCreativeCommonsNdFill,
  RiThreadsLine,
  RiCloseLine,
} from "react-icons/ri";
import { IoMdSchool, IoMdFootball } from "react-icons/io";

const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarOpen = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 z-50">
      {/* Hamburger menu for small screens */}
      <div className="lg:hidden">
        <button onClick={toggleSidebarOpen} className="text-xl">
          <RiMenuLine />
        </button>
      </div>

      {/* Navigation links for larger screens */}
      <ul
        className={`lg:flex items-center space-x-4 ${
          sidebarOpen ? "lg:space-x-8" : "hidden"
        }`}
      >
        <li className="flex items-center">
          <RiHome2Line className="mr-2" />
          <span className="hidden lg:inline-block">Home</span>
        </li>
        <li className="flex items-center">
          <RiNewspaperLine className="mr-2" />
          <span className="hidden lg:inline-block">Articles</span>
        </li>
        <li className="flex items-center">
          <RiEarthLine className="mr-2" />
          <span className="hidden lg:inline-block">Africa</span>
        </li>
        <li className="flex items-center">
          <RiBuildingLine className="mr-2" />
          <span className="hidden lg:inline-block">International News</span>
        </li>
        <li className="flex items-center">
          <RiArrowRightSLine className="mr-2" />
          <span className="hidden lg:inline-block">Immigration</span>
        </li>
        <li className="flex items-center">
          <RiBuildingLine className="mr-2" />
          <span className="hidden lg:inline-block">Business</span>
        </li>
        <li className="flex items-center">
          <RiThreadsLine className="mr-2" />
          <span className="hidden lg:inline-block">Trending News</span>
        </li>
        <li className="flex items-center">
          <IoMdFootball className="mr-2" />
          <span className="hidden lg:inline-block">Sports</span>
        </li>
        <li className="flex items-center">
          <IoMdSchool className="mr-2" />
          <span className="hidden lg:inline-block">Education</span>
        </li>
      </ul>

      {/* Sidebar for small screens */}
      {/* Sidebar for small screens */}

      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 ${
          sidebarIsOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebarOpen}
      ></div>
      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-white transform duration-300 ease-in-out ${
          sidebarIsOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Top section with company name and close icon */}
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <span className="text-xl font-bold">WN </span>
          <button onClick={toggleSidebarOpen}>
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        {/* Navigation links */}
        <div className="py-4 overflow-y-auto">
          {/* <div className="flex flex-col justify-between"> */}
          <ul className="space-y-2 font-medium ml-2 text-gray-800">
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl px-2">
              <RiHome2Line
                className="mr-2"
                fill="currentColor"
                viewBox="0 0 22 21"
              />
              <span className="ms-3 text-gray-800">Home</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl px-2">
              <RiNewspaperLine className="mr-2" />
              <span>Articles</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl px-2">
              <RiBuildingLine className="mr-2" />
              <span className="">International News</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl px-2">
              <RiArrowRightSLine className="mr-2" />
              <span className="">Immigration</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl px-2">
              <RiBuildingLine className="mr-2" />
              <span className="">Business</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl">
              <RiCreativeCommonsNdFill className="mr-2" />
              <span className="">Trending News</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl">
              <IoMdFootball className="mr-2" />
              <span className="">Sports</span>
            </li>
            <li className="flex items-center group transition duration-150 ease-in-out transform hover:bg-gray-200 p-1 hover:rounded-2xl">
              <IoMdSchool className="mr-2" />
              <span className="">Education</span>
            </li>
          </ul>
        </div>
        <div className="mt-auto p-4 bg-gray-900">
          <div>
            <span className="text-gray-200">Welcome, UserName</span>
          </div>
          <button
            className="text-gray-200 mt-2"
            onClick={() => console.log("Logout clicked")}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
