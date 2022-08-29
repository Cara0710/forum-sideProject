import React from "react";
import Posts from "../../components/Posts";
const Mypost = () => {
  const array = [0, 1, 2];
  return (
    <div className="mypost">
      {array.map((d) => {
        return <Posts />;
      })}
    </div>
  );
};

export default Mypost;
