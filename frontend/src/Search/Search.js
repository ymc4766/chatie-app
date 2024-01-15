import React, { useState } from "react";
import axios from "axios";
import { USERS_URL } from "../redux/constants";
import { useSelector } from "react-redux";
import ReturnIcon from "../svg/Return";
import SearchIcon from "../svg/Search";
import FilterIcon from "../svg/FilterIcon";

const Search = ({ searchLength, setSearchResults }) => {
  const [show, setShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const handleSearch = async (e) => {
    // e.preventDefault();

    if (e.target.value && e.key === "Enter") {
      try {
        const { data } = await axios.get(
          `${USERS_URL}/user/search?search=${e.target.value}`
        );
        setSearchResults(data);
        // setShow(false);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      {/*Search input container*/}
      {/*Container*/}
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation
             cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center  cursor-pointer">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or Start new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
