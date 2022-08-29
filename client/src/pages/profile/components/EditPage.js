import React from "react";

const EditPage = ({ handleEditPage, editStatus }) => {
  return (
    <div className="editPage">
      <div className={editStatus ? "editPage-box moveBox" : "editPage-box"}>
        <div className="editPage-container">
          <div className="title">
            <h1>編輯檔案</h1>
          </div>
          <div className="username">
            <p>使用者名稱:</p>
            <input placeholder="請輸入使用者名稱" type="text" id="username" />
          </div>
          <div className="password">
            <p>密碼:</p>
            <input placeholder="請輸入密碼" type="password" id="password" />
          </div>
          <div className="button">
            <button onClick={() => handleEditPage(false)}>取消</button>
            <button onClick={() => handleEditPage(false)}>確定</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
