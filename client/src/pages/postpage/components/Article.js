import React from "react";

const Article = ({ handleEditPage, editbutton, setDeletePage }) => {
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
            <h1>公司旅遊要去緬甸呱呱呱呱嘎擦擦?</h1>
          </div>
          <div className="content">
            <p>
              如題，公司說這一季業績很好，為了獎勵員工，
              <br />
              要帶我們20人去緬甸玩七天六夜，這是正常的嗎?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
