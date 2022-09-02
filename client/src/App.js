import React, { useState, useEffect, useRef } from "react";
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
  const allPostDataStatus = useRef(false);
  // initialize get allPost data
  useEffect(() => {
    PostsService.getAllPost()
      .then((d) => {
        setAllPostData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // if allpostdata change than restart get data
  useEffect(() => {
    if (!allPostDataStatus.current) {
      return;
    }
    PostsService.getAllPost()
      .then((d) => {
        setAllPostData(d.data);
        allPostDataStatus.current = false;
      })
      .catch((e) => {
        console.log(e);
        allPostDataStatus.current = false;
      });
  }, [allPostData]);

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
                allPostDataStatus={allPostDataStatus}
                allPostData={allPostData}
              />
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            <Profile
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              setAllPostData={setAllPostData}
            />
          }
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
