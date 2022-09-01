import React, { useState, useEffect, useRef } from "react";
import TabBar from "./components/Tab-bar";
import Mypost from "./components/Mypost";
import Myprofile from "./components/Myprofile";
import EditPage from "./components/EditPage";
import { useNavigate } from "react-router-dom";
import PostAuthService from "../../services/postAuth.service";
import PostsService from "../../services/posts.service";

const Profile = ({ currentUser, setCurrentUser, setAllPostData }) => {
  const [index, setIndex] = useState("mypost");
  const [editStatus, setEditStatus] = useState(false);
  const [userAllPost, setUserAllPost] = useState(null);
  const currentUserStatus = useRef(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // set editpage visible
  const handleEditPage = (status) => {
    setEditStatus(status);
  };
  // if not login can not see the profile page
  useEffect(() => {
    if (!currentUser) {
      window.alert("請先登入");
      navigate("/login");
    } else {
      setLoading(true);
      // if user than get initialize user all post
      PostAuthService.findUserPost(currentUser.user._id)
        .then((d) => {
          setLoading(false);
          console.log(d.data);
          setUserAllPost(d.data);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, []);

  // if currentUser chang than restart get userpost data and allpost data
  useEffect(() => {
    if (!currentUserStatus.current) {
      return;
    }
    console.log("currentuser change!");
    PostAuthService.findUserPost(currentUser.user._id)
      .then((d) => {
        console.log(d.data);
        setUserAllPost(d.data);
        currentUserStatus.current = false;
      })
      .catch((e) => {
        console.log(e);
      });

    PostsService.getAllPost()
      .then((d) => {
        console.log(d.data);
        setAllPostData(d.data);
        currentUserStatus.current = false;
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentUser]);

  return (
    <div className="profile">
      {/* loading css animation */}
      {loading && (
        <div className="loading-box">
          <div className="loading la-ball-8bits la-2x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {currentUser && <TabBar index={index} setIndex={setIndex} />}
      {index === "mypost" && userAllPost && currentUser && (
        <Mypost
          index={index}
          userAllPost={userAllPost}
          currentUser={currentUser}
        />
      )}
      {index === "myprofile" && currentUser && (
        <Myprofile currentUser={currentUser} handleEditPage={handleEditPage} />
      )}
      {editStatus && currentUser && (
        <EditPage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          editStatus={editStatus}
          handleEditPage={handleEditPage}
          currentUserStatus={currentUserStatus}
        />
      )}
    </div>
  );
};

export default Profile;
