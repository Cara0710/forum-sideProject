import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Posts = ({ data }) => {
  const [average, setAverage] = useState(0);
  const navigate = useNavigate();
  const handlePost = () => {
    navigate(`/forum/post/${data._id}`);
  };

  // caculate average
  useEffect(() => {
    if (data) {
      const number = data.comments.map((d) => {
        return d.dangerous;
      });
      if (number.length === 0) return;
      const result = number.reduce((pre, cur) => {
        return pre + cur;
      });
      setAverage(result / number.length);
    }
  }, []);

  // handle dangerous circle color
  const handleCircleColor = () => {
    return {
      backgroundColor:
        average >= 1 && average < 5
          ? "#24FF00"
          : average >= 5 && average < 7.5
          ? "#F68500"
          : average >= 7.5 && average <= 10
          ? "#EF3737"
          : "white",
    };
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
            <div className="message">{`${data.comments.length}則留言`}</div>
            <div style={handleCircleColor()} className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
