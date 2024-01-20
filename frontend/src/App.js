import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { io } from "socket.io-client";
import SocketContext from "./Context/SocketContext";
import Home from "./screens/HomeScreen";
import ChatScreen from "./ChatScreens/ChatScreen";
import ChatButton from "./components/ChatButton";
import CreatePostButton from "./components/TweatButton";
import Header from "./header/Header";
import LoginScreen from "./screenUser/LoginScreen";
import PostDetails from "./screens/posts/PostDetails";
import Navigation from "./sidebar/Navigation";
import RegisterScreen from "./screenUser/RegisterScreen";
import HomePage from "./screens/HomePage";
import UsersScreen from "./screenUser/UsersScreen";
import Widget from "./screens/Widget";
import SidebarScreen from "./screens/SidebarScreen";

const socket = io("http://localhost:5000");

function App() {
  // useEffect(() => {}, [socket]);

  if (typeof process !== "undefined" && process.release.name === "node") {
    // Server-side code using process
    console.log("Running in Node.js environment");
  } else {
    // Client-side code
    console.log("Running in browser environment");
  }

  const Layout = () => {
    return (
      <SocketContext.Provider value={socket}>
        <div className=" flex flex-col w-[100%]">
          <>{/* <Navbar /> */}</>

          <div className="flex-1 container mx-auto flex">
            <div className="hidden md:block md:w-1/4 flex-shrink-0 p-4">
              <SidebarScreen />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </div>
            <div className="widgetContainer hidden md:flex w-1/4 bg-gray-100 p-4  h-screen">
              <Widget />
            </div>
          </div>
          {/* <Footer /> */}
          <div className="flex items-center space-x-4">
            <CreatePostButton />

            <ChatButton />
          </div>
        </div>
      </SocketContext.Provider>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/post/:id",
          element: <PostDetails />,
        },
        {
          path: "/users",
          element: <UsersScreen />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
  ]);
  return (
    <div className="dark">
      {/* <SocketContext.Provider value={socket}>
        <Router>
          <Header />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home socket={socket} />} />
            <Route path="/homepage" element={<HomePage />} />

            <Route path="/post/:id" exact element={<PostDetails />} />
            <Route path="/login" exact element={<LoginScreen />} />
            <Route path="/register" exact element={<RegisterScreen />} />
          </Routes>
          <div className="flex items-center space-x-4">
            <CreatePostButton />

            <ChatButton />
          </div>
        </Router>
      </SocketContext.Provider> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
