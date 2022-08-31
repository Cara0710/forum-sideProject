import React, { useState, useEffect } from "react";
import TabBar from "./components/Tab-bar";
import Mypost from "./components/Mypost";
import Myprofile from "./components/Myprofile";
import EditPage from "./components/EditPage";
import { useNavigate } from "react-router-dom";
import postAuthService from "../../services/postAuth.service";

const Profile = ({ currentUser }) => {
  const [index, setIndex] = useState(1);
  const [editStatus, setEditStatus] = useState(false);
  const [userAllPost, setUserAllPost] = useState(null);

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
      // if user than get initialize user all post
      postAuthService
        .findUserPost(currentUser.user._id)
        .then((d) => {
          console.log(d.data);
          setUserAllPost(d.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div className="profile">
      {/* loading css animation */}
      {!userAllPost && (
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
      {index === 1 && userAllPost && currentUser && (
        <Mypost userAllPost={userAllPost} currentUser={currentUser} />
      )}
      {index === 2 && currentUser && (
        <Myprofile currentUser={currentUser} handleEditPage={handleEditPage} />
      )}
      {editStatus && currentUser && (
        <EditPage editStatus={editStatus} handleEditPage={handleEditPage} />
      )}
    </div>
  );
};

export default Profile;
