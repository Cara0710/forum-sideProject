import React, { useState } from "react";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";

const Messages = () => {
  const [editButton, setEditButton] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
  const [editPage, setEditPage] = useState(false);
  // make edit message button visible
  const handleEditButton = (e) => {
    if (e.target.className !== "editButton") return setEditButton(false);
    editButton ? setEditButton(false) : setEditButton(true);
  };

  const handleEditMessage = () => {
    setEditButton(false);
    setEditPage(true);
  };
  const handleDeleteMessage = () => {
    setEditButton(false);
    setDeletePage(true);
  };

  return (
    <div onClick={handleEditButton} className="messages-box">
      <div className="messages-container">
        <div className="up">
          <div className="left">
            <p className="username">天下第一帥</p>
            <p className="date">2022/5/6</p>
          </div>
          <div className="right">
            <p onClick={() => setEditButton(true)} className="editButton">
              ⋯
            </p>
            {editButton && (
              <div className="button">
                <button onClick={handleEditMessage} className="edit-message">
                  編輯留言
                </button>
                <button onClick={handleDeleteMessage}>刪除留言</button>
              </div>
            )}
          </div>
        </div>
        <div className="down">
          <div className="content">
            <p>別去啊!!!!這明顯不太對</p>
          </div>
          <div className="dangerous">
            <p>危險指數:3</p>
          </div>
        </div>
      </div>
      {editPage && (
        <EditMessage editPage={editPage} setEditPage={setEditPage} />
      )}
      {deletePage && (
        <DeleteMessage deletePage={deletePage} setDeletePage={setDeletePage} />
      )}
    </div>
  );
};

export default Messages;
