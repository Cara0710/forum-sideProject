import React from "react";
import Posts from "../../components/Posts";

const Allpost = ({ index, setIndex }) => {
  const array = [1, 2, 3, 4, 5];
  return (
    <div className="allpost">
      {array.map((d) => {
        return <Posts />;
      })}
    </div>
  );
};

export default Allpost;
