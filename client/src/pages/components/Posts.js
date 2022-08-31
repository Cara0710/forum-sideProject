import React from "react";
import { useNavigate } from "react-router-dom";

const Posts = ({ data }) => {
  const navigate = useNavigate();
  const handlePost = () => {
    navigate(`/forum/post/${data._id}`);
  };
  return (
    <div className="posts">
      <div onClick={handlePost} className="posts-box">
        <div className="posts-container">
          <div className="left">
            <div className="up">
              <p className="username">{data.author.username}</p>
              <p className="date">{`${data.date.slice(
                5,
                7
              )} / ${data.date.slice(8, 10)}`}</p>
            </div>
            <h1>{data.title}</h1>
          </div>
          <div className="right">
            <div className="message">1則留言</div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
