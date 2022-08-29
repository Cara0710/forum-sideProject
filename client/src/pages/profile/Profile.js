import React, { useState } from "react";
import TabBar from "./components/Tab-bar";
import Mypost from "./components/Mypost";
import Myprofile from "./components/Myprofile";
import EditPage from "./components/EditPage";

const Profile = () => {
  const [index, setIndex] = useState(1);
  const [editStatus, setEditStatus] = useState(false);
  const handleEditPage = (status) => {
    setEditStatus(status);
  };
  return (
    <div className="profile">
      <TabBar index={index} setIndex={setIndex} />
      {index === 1 && <Mypost />}
      {index === 2 && <Myprofile handleEditPage={handleEditPage} />}
      {editStatus && (
        <EditPage editStatus={editStatus} handleEditPage={handleEditPage} />
      )}
    </div>
  );
};

export default Profile;
