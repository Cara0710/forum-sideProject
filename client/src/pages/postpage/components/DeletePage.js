import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostAuthService from "../../../services/postAuth.service";

const DeletePage = ({
  deletePage,
  setDeletePage,
  data,
  allPostDataStatus,
  setAllPostData,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // delete articale
  const handleDelete = () => {
    allPostDataStatus.current = true;
    setLoading(true);
    PostAuthService.deletePost(data._id)
      .then((d) => {
        const deleteId = data._id;
        setAllPostData((pre) => {
          const newData = pre.filter((data) => {
            return data._id !== deleteId;
          });
          return newData;
        });
        setLoading(false);
        setDeletePage(false);
        navigate("/forum");
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
            <h1>確認永久刪除此貼文?</h1>
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

export default DeletePage;
