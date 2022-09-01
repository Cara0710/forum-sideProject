import React, { useState } from "react";
import TabBar from "./components/Tab-bar";
import Allpost from "./components/Allpost";
import Newpost from "./components/Newpost";

const Forum = ({ currentUser, allPostData, setAllPostData }) => {
  const [index, setIndex] = useState(1);
  const [newpostPage, setNewpostPage] = useState(false);
  const handleNewpost = (status) => {
    setNewpostPage(status);
  };

  return (
    <div className="forum">
      <TabBar index={index} setIndex={setIndex} />
      <Allpost index={index} allPostData={allPostData} setIndex={setIndex} />
      {newpostPage && (
        <Newpost
          currentUser={currentUser}
          handleNewpost={handleNewpost}
          newpostPage={newpostPage}
          setAllPostData={setAllPostData}
        />
      )}
      <div className="newpost-button">
        <div className="button" onClick={() => handleNewpost(true)}>
          <p>✎</p>
        </div>
      </div>
    </div>
  );
};

export default Forum;
