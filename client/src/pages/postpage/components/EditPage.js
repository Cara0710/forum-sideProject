import React from "react";

const EditPage = ({ editPage, handleEditPage }) => {
  return (
    <div className="editPage">
      <div className={editPage ? "editPage-box moveBox" : "editPage-box"}>
        <div className="editPage-container">
          <div className="new">
            <h1>編輯貼文</h1>
          </div>
          <div className="title">
            <input placeholder="標題..." type="text" id="title" />
          </div>
          <div className="textarea">
            <textarea placeholder="內容..." id="textarea" rows="10"></textarea>
          </div>
          <div className="button">
            <button onClick={() => handleEditPage(false)}>取消</button>
            <button onClick={() => handleEditPage(false)}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
