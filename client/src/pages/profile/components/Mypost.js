import React from "react";
import Posts from "../../components/Posts";

const Mypost = ({ currentUser, userAllPost, index }) => {
  return (
    <div className="mypost">
      {userAllPost && userAllPost.length === 0 && (
        <div className="nopost">尚無任何貼文</div>
      )}
      {userAllPost &&
        userAllPost.map((data) => {
          return <Posts index={index} data={data} key={data._id} />;
        })}
    </div>
  );
};

export default Mypost;
