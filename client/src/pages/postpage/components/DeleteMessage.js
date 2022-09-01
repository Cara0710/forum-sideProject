import React, { useState } from "react";
import PostAuthService from "../../../services/postAuth.service";

const DeleteMessage = ({
  deletePage,
  setDeletePage,
  data,
  postDataStatus,
  setPostData,
}) => {
  const [loading, setLoading] = useState(false);
  // deleted message
  const handleDelete = () => {
    postDataStatus.current = true;
    setLoading(true);
    PostAuthService.deleteComment(data._id)
      .then((d) => {
        const deleteId = data._id;
        setPostData((pre) => {
          const newData = pre.comments.filter((d) => {
            return d._id !== deleteId;
          });
          return { ...pre, comments: newData };
        });
        setDeletePage(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <div className="deletePage">
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

      <div className={deletePage ? "deletePage-box moveBox" : "deletePage-box"}>
        <div className="deletePage-container">
          <div className="delete">
            <h1>確認永久刪除此留言?</h1>
          </div>
          <div className="button">
            <button onClick={() => setDeletePage(false)}>取消</button>
            <button onClick={handleDelete}>確認</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage;
