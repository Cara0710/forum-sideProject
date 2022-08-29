import React from "react";
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
const App = () => {
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/">
          <Route path="forum" element={<Forum />} />
          <Route path="forum/:id" element={<PostPage />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
