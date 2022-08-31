import React, { useState, useEffect } from "react";
import postAuthService from "../../../services/postAuth.service";
import { useNavigate } from "react-router-dom";

const Newpost = ({
  handleNewpost,
  newpostPage,
  currentUser,
  setAllPostData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  // error message
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // if not login can not see the profile page

  useEffect(() => {
    if (!currentUser) {
      window.alert("請先登入");
      navigate("/login");
    }
  }, []);

  // get input
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSend = () => {
    setLoading(true);
    postAuthService
      .newPost(title, description)
      .then((d) => {
        const addData = d.data;
        setAllPostData((pre) => {
          return [...pre, addData];
        });
        setLoading(false);
        handleNewpost(false);
      })
      .catch((e) => {
        setLoading(false);
        setMessage(e.response.data);
      });
  };

  return (
    <div className="newpost">
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
      <div className={newpostPage ? "newpost-box moveBox" : "newpost-box"}>
        <div className="newpost-container">
          <div className="new">
            <h1>新增貼文</h1>
          </div>
          <div className="title">
            <input
              onChange={handleTitle}
              placeholder="標題..."
              type="text"
              id="title"
            />
          </div>
          <div className="textarea">
            <textarea
              onChange={handleDescription}
              placeholder="內容..."
              id="textarea"
              rows="10"
            ></textarea>
          </div>
          {message && <div className="error">{message}</div>}
          <div className="button">
            <button onClick={() => handleNewpost(false)}>取消</button>
            <button onClick={handleSend}>發布</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newpost;
