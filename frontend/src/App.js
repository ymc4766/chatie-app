import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
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
import { useEffect, useState } from "react";
import RegisterScreen from "./screenUser/RegisterScreen";
import HomePage from "./screens/HomePage";

const socket = io(process.env.REACT_APP_API_ENDPOINT);

function App() {
  const [call, setCall] = useState();
  // const sendMessage = (message) => {
  //   // Emit a 'message' event to the server
  //   socket.emit("message", { content: message });
  // };

  // useEffect(() => {
  //   // Listen for incoming messages from the server
  //   socket.on("message", (data) => {
  //     console.log("Received message:", data);
  //     // Handle the received message as needed
  //   });

  //   // Clean up event listeners when the component unmounts
  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Header />
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={<Home socket={socket} call={call} setCall={setCall} />}
            />
            <Route path="/homepage" element={<HomePage />} />

            {/* <Route path="/chatsscreen" element={<HomeScreen />} /> */}

            <Route path="/post/:id" exact element={<PostDetails />} />
            <Route path="/login" exact element={<LoginScreen />} />
            <Route path="/register" exact element={<RegisterScreen />} />
          </Routes>
          <div className="flex items-center space-x-4">
            <CreatePostButton />

            <ChatButton call={call} setCall={setCall} />
          </div>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
