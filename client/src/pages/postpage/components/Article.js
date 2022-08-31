import React from "react";

const Article = ({ handleEditPage, editbutton, setDeletePage, data }) => {
  return (
    <div className="article">
      <div className="article-box">
        <div className="edit">
          <p className="edit-button">☰</p>
          {editbutton && (
            <div className="button">
              <button
                onClick={() => handleEditPage(true)}
                className="edit-article"
              >
                編輯貼文
              </button>
              <button onClick={() => setDeletePage(true)}>刪除貼文</button>
            </div>
          )}
        </div>
        <div className="article-container">
          <div className="up">
            <div className="left">
              <p className="username">Ben</p>
              <p className="date">2022/8/30</p>
            </div>
            <div className="right">
              <div className="circle"></div>
            </div>
          </div>
          <div className="title">
            <h1>{data.title}</h1>
          </div>
          <div className="content">
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
