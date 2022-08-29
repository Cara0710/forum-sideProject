import React from "react";

const TabBar = ({ index, setIndex }) => {
  const handleIndex = (index) => {
    setIndex(index);
  };
  return (
    <div className="tab-bar">
      <ul>
        <li onClick={() => handleIndex(1)}>
          <div>
            <p className={index === 1 ? "active" : "tabs"}>所有討論</p>
          </div>
        </li>
        <li onClick={() => handleIndex(2)}>
          <div>
            <div className="circle red"></div>
            <p className={index === 2 ? "active" : "tabs"}>危險區</p>
          </div>
        </li>
        <li onClick={() => handleIndex(3)}>
          <div>
            <div className="circle yellow"></div>
            <p className={index === 3 ? "active" : "tabs"}>警告區</p>
          </div>
        </li>
        <li onClick={() => handleIndex(4)}>
          <div>
            <div className="circle green"></div>
            <p className={index === 4 ? "active" : "tabs"}>安全區</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
