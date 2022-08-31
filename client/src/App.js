import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Navbar";
import Home from "../src/pages/home/Home";
import Forum from "../src/pages/forum/Forum";
import Profile from "../src/pages/profile/Profile";
import Register from "../src/pages/register/Register";
import Login from "../src/pages/login/Login";
import Help from "../src/pages/help/Help";
import PostPage from "../src/pages/postpage/Postpage";
import NotFound from "./components/NotFound";
import "../src/styles/style.css";
import AuthService from "./services/auth.services";
import PostsService from "./services/posts.service";
const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [allPostData, setAllPostData] = useState(null);

  // initialize get allPost data
  useEffect(() => {
    PostsService.getAllPost()
      .then((d) => {
        console.log(d.data);
        setAllPostData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/">
          <Route
            path="forum"
            element={
              <Forum
                setAllPostData={setAllPostData}
                currentUser={currentUser}
                allPostData={allPostData}
              />
            }
          />
          <Route
            path="forum/post/:_id"
            element={
              <PostPage
                setAllPostData={setAllPostData}
                currentUser={currentUser}
              />
            }
          />
        </Route>
        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route path="/help" element={<Help />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
