import React, { useState, useEffect } from "react";
import TabBar from "./components/Tab-bar";
import Mypost from "./components/Mypost";
import Myprofile from "./components/Myprofile";
import EditPage from "./components/EditPage";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser }) => {
  const [index, setIndex] = useState(1);
  const [editStatus, setEditStatus] = useState(false);

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
    }
  }, []);

  return (
    <div className="profile">
      {currentUser && <TabBar index={index} setIndex={setIndex} />}
      {index === 1 && currentUser && <Mypost currentUser={currentUser} />}
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
