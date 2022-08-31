import React, { useState } from "react";

const Article = ({
  handleEditPage,
  editbutton,
  setDeletePage,
  data,
  average,
  currentUser,
}) => {
  // handle dangerous circle color
  const handleCircleColor = () => {
    return {
      backgroundColor:
        average >= 1 && average < 5
          ? "#24FF00"
          : average >= 5 && average < 7.5
          ? "#F68500"
          : average >= 7.5 && average <= 10
          ? "#EF3737"
          : "white",
    };
  };

  return (
    <div className="article">
      <div className="article-box">
        <div className="edit">
          <p
            className={
              currentUser && currentUser.user._id === data.author._id
                ? "edit-button"
                : "edit-button notauthor"
            }
          >
            ☰
          </p>

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
              <p className="username">{data.author.username}</p>
              <p className="date">{`${data.date.slice(
                0,
                4
              )} / ${data.date.slice(5, 7)} / ${data.date.slice(8, 10)}`}</p>
            </div>
            <div className="right">
              <div className="average">{average.toFixed(2)}</div>
              <div style={handleCircleColor()} className="circle"></div>
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
