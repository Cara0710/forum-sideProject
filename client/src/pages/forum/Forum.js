import React, { useState } from "react";
import TabBar from "./components/Tab-bar";
import Allpost from "./components/Allpost";
import Newpost from "./components/Newpost";

const Forum = () => {
  const [index, setIndex] = useState(1);
  return (
    <div className="forum">
      <TabBar index={index} setIndex={setIndex} />
      <Allpost index={index} setIndex={setIndex} />
      <Newpost />
      <div className="newpost-button">
        <div className="button">
          <p>✎</p>
        </div>
      </div>
    </div>
  );
};

export default Forum;
