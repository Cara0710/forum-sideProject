import React from "react";

const Newpost = ({ handleNewpost, newpostPage }) => {
  return (
    <div className="newpost">
      <div className={newpostPage ? "newpost-box moveBox" : "newpost-box"}>
        <div className="newpost-container">
          <div className="new">
            <h1>新增貼文</h1>
          </div>
          <div className="title">
            <input placeholder="標題..." type="text" id="title" />
          </div>
          <div className="textarea">
            <textarea placeholder="內容..." id="textarea" rows="10"></textarea>
          </div>
          <div className="button">
            <button onClick={() => handleNewpost(false)}>取消</button>
            <button onClick={() => handleNewpost(false)}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newpost;
