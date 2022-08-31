import React, { useState } from "react";
import Messages from "./Messages";
import PostAuthService from "../../../services/postAuth.service";
import { useNavigate } from "react-router-dom";

const Comment = ({ currentUser, data, setPostData }) => {
  const [description, setDescription] = useState("");
  const [dangerous, setDangerous] = useState(0);
  const [dangerousColor, setDangerousColor] = useState("#1F1F1F");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [loading, setLoading] = useState(false);
  // error message
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // textarea auto hight
  const autoGrow = (e) => {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // set input color and value
  const handleDangerous = (e) => {
    // if not login navigate to login page
    if (!currentUser) {
      window.alert("請先登入");
      navigate("/login");
    } else {
      // set input color and value
      setDangerous(e.target.value);
      if (e.target.value >= 1 && e.target.value < 5) {
        setBackgroundColor("#24FF00");
        return setDangerousColor("#1F1F1F");
      } else if (e.target.value >= 5 && e.target.value < 7.5) {
        setBackgroundColor("#F68500");
        return setDangerousColor("white");
      } else if (e.target.value >= 7.5 && e.target.value <= 10) {
        setBackgroundColor("#EF3737");
        return setDangerousColor("white");
      }
    }
  };

  const handleDescription = (e) => {
    // if not login navigate to login page
    if (!currentUser) {
      window.alert("請先登入");
      navigate("/login");
    } else {
      // set input color and value
      setDescription(e.target.value);
    }
  };

  // cancle add comment
  const handleCancle = (e) => {
    // return original textarea style
    e.target.parentElement.parentElement.children[0].style.height = "40px";
    setDescription("");
    setDangerous(0);
    setBackgroundColor("white");
    setDangerousColor("#1F1F1F");
    setMessage("");
  };

  // add new comment
  const handleSend = (e) => {
    setLoading(true);
    PostAuthService.newComment(data._id, dangerous, description)
      .then((d) => {
        setLoading(false);
        setPostData((pre) => {
          return { ...pre, comments: [...pre.comments, d.data] };
        });
        // return original textarea style
        e.target.parentElement.parentElement.children[0].style.height = "40px";
        setDescription("");
        setDangerous(0);
        setBackgroundColor("white");
        setDangerousColor("#1F1F1F");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        setMessage(e.response.data);
      });
  };

  return (
    <div className="comment">
      <div className="comment-box">
        <div className="comment-container">
          <div className="up">
            <p className="title">---留言板---</p>
            <p className="number">{`${data.comments.length}則留言`}</p>
          </div>
          <div className="input">
            <div>
              <label htmlFor="dangerous">危險指數:</label>
              <input
                onChange={handleDangerous}
                value={dangerous}
                type="range"
                min="1"
                max="10"
                step="1"
              />
              <p
                style={{
                  color: dangerousColor,
                  backgroundColor: backgroundColor,
                }}
              >
                {dangerous}
              </p>
            </div>
            <div className="text">
              <textarea
                onChange={handleDescription}
                onInput={autoGrow}
                placeholder="請輸入留言..."
                id="message"
                value={description}
              ></textarea>
              {message && <div className="error error-comment">{message}</div>}
              <div className="button">
                <button onClick={handleCancle}>取消</button>
                <button onClick={handleSend}>留言</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* loading css animation */}
      {loading && (
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

      <div className="messages-wrapper">
        {data && data.comments.length === 0 && (
          <div className="noComment">尚未有任何留言</div>
        )}
        {data &&
          data.comments.map((d) => {
            return <Messages data={d} key={d._id} currentUser={currentUser} />;
          })}
      </div>
    </div>
  );
};

export default Comment;
