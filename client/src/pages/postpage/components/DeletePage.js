import React from "react";

const DeletePage = ({ deletePage, setDeletePage }) => {
  return (
    <div className="deletePage">
      <div className={deletePage ? "deletePage-box moveBox" : "deletePage-box"}>
        <div className="deletePage-container">
          <div className="delete">
            <h1>確認永久刪除此貼文?</h1>
          </div>
          <div className="button">
            <button onClick={() => setDeletePage(false)}>取消</button>
            <button onClick={() => setDeletePage(false)}>確認</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
