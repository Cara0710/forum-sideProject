import React, { useState, useEffect } from "react";
import Posts from "../../components/Posts";
import postAuthService from "../../../services/postAuth.service";
const Mypost = ({ currentUser }) => {
  const [userAllPost, setUserAllPost] = useState(null);

  // get initialize user all post
  useEffect(() => {
    postAuthService
      .findUserPost(currentUser.user._id)
      .then((d) => {
        console.log(d.data);
        setUserAllPost(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="mypost">
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
      {userAllPost && userAllPost.length === 0 && (
        <div className="nopost">您尚無發布過貼文</div>
      )}
      {userAllPost &&
        userAllPost.map((data) => {
          return <Posts data={data} key={data._id} />;
        })}
    </div>
  );
};

export default Mypost;
