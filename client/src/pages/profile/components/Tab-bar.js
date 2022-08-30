import React from "react";

const TabBar = ({ index, setIndex }) => {
  return (
    <div className="tab-bar">
      <ul>
        <li className={index === 1 ? "active" : ""} onClick={() => setIndex(1)}>
          <p>★</p>
          我的貼文
        </li>
        <li className={index === 2 ? "active" : ""} onClick={() => setIndex(2)}>
          <p>★</p>
          個人資料
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
