import React, { useState } from "react";
import PostAuthService from "../../../services/postAuth.service";
const EditPage = ({
  editPage,
  handleEditPage,
  data,
  postDataStatus,
  setPostData,
}) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  // error message
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // send updated article
  const handleSave = () => {
    postDataStatus.current = true;
    setLoading(true);
    PostAuthService.updatePost(data._id, title, description)
      .then((d) => {
        setLoading(false);
        setPostData(d.data);
        handleEditPage(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
        setMessage(e.response.data);
      });
  };

  return (
    <div className="editPage">
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
      <div className={editPage ? "editPage-box moveBox" : "editPage-box"}>
        <div className="editPage-container">
          <div className="new">
            <h1>編輯貼文</h1>
          </div>
          <div className="title">
            <input
              value={title}
              onChange={handleTitle}
              placeholder="標題..."
              type="text"
              id="title"
            />
          </div>
          <div className="textarea">
            <textarea
              value={description}
              onChange={handleDescription}
              placeholder="內容..."
              id="textarea"
              rows="10"
            ></textarea>
            {message && <div className="error">{message}</div>}
          </div>
          <div className="button">
            <button onClick={() => handleEditPage(false)}>取消</button>
            <button onClick={handleSave}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
