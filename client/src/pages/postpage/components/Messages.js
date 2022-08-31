import React, { useState } from "react";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";

const Messages = ({ data }) => {
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
            <p className="username">{data.author.username}</p>
            <p className="date">{`${data.date.slice(0, 4)} / ${data.date.slice(
              5,
              7
            )} / ${data.date.slice(8, 10)}`}</p>
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
            <p>{data.content}</p>
          </div>
          <div className="dangerous">
            <p>{`危險指數:${data.dangerous}`}</p>
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
