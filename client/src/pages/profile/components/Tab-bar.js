import React from "react";

const TabBar = ({ index, setIndex }) => {
  return (
    <div className="tab-bar">
      <ul>
        <li
          className={index === "mypost" ? "active" : ""}
          onClick={() => setIndex("mypost")}
        >
          <p>★</p>
          我的貼文
        </li>
        <li
          className={index === "myprofile" ? "active" : ""}
          onClick={() => setIndex("myprofile")}
        >
          <p>★</p>
          個人資料
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
