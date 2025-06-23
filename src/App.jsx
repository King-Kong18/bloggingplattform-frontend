import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate, BrowserRouter as Router } from "react-router-dom";

import Blogs from "./Components/Blogs.jsx";
import Logout from "./Components/Logout.jsx";
import CreateNewBlog from "./Components/CreateNewBlog.jsx";
import Home from "./Components/Home.jsx";
import Footer from "./Components/Footer.jsx";
import LogIn from "./Components/LogIn.jsx";
import EditBlog from "./Components/EditBlog.jsx";
import Profile from "./Components/Profile.jsx";
import Chat from "./Components/Chat.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [benutzerId, setBenutzerId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUsername(user.username);
    setBenutzerId(user.id);
    setPassword(user.password);
    setLoggedIn(true);
    navigate("/start");
  };

  const handleLogout = () => {
    setUsername("");
    setBenutzerId("");
    setPassword("");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="content">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={loggedIn ? <Navigate to="/start" replace /> : <LogIn onLogin={handleLogin} />}
            />

            <Route
              path="/start"
              element={loggedIn ? <Blogs username={username} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/new-blog"
              element={
                loggedIn ? (
                  <CreateNewBlog
                    username={username}
                    benutzerId={benutzerId}
                    password={password}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/edit-blog/:id"
              element={loggedIn ? <EditBlog username={username} /> : <Navigate to="/" replace />}
            />

            <Route
              path="/logout"
              element={loggedIn ? <Logout onLogout={handleLogout} /> : <Navigate to="/" replace />}
            />

            <Route
              path="/my-profile"
              element={
                loggedIn ? (
                  <Profile
                    username={username}
                    benutzerId={benutzerId}
                    password={password}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/chat"
              element={
                loggedIn ? (
                  <Chat username={username} benutzerId={benutzerId} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
