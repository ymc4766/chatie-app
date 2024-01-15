import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <header className="">
      <header className="bg-slate-400 p-2 flex items-center justify-between">
        {/* Search input div */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="py-1 px-2 rounded-md lg:w-64"
          />
        </div>

        {/* App name div */}
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">WN</span>
        </div>
        <div className="flex items-center space-x-3 mr-3 ml-4">
          {!userInfo ? (
            <div className="flex items-center">
              <Link to="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {userInfo && userInfo?.name}
              </button>
            </div>
          )}

          {userInfo && (
            <div className="text-sm bg-orange-500 px-2 p-1 rounded-3xl">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          )}
        </div>

        {/* Subscribe button div */}
      </header>
    </header>
  );
};

export default Header;
