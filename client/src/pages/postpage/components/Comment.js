import React, { useState } from "react";
import Messages from "./Messages";

const Comment = () => {
  const [description, setDescription] = useState("");
  const [dangerous, setDangerous] = useState(0);
  const [dangerousColor, setDangerousColor] = useState("#1F1F1F");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const array = [1, 2, 3, 4];

  // textarea auto hight
  const autoGrow = (e) => {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // set input color and value
  const handleDangerous = (e) => {
    setDangerous(e.target.value);
    if (e.target.value >= 1 && e.target.value < 5) {
      setBackgroundColor("#24FF00");
      return setDangerousColor("#1F1F1F");
    } else if (e.target.value >= 5 && e.target.value < 7.5) {
      setBackgroundColor("#F68500");
      return setDangerousColor("white");
    } else if (e.target.value >= 7.5 && e.target.value <= 10) {
      setBackgroundColor("#EF3737");
      return setDangerousColor("white");
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // button cancle
  const handleCancle = (e) => {
    // return original textarea style
    e.target.parentElement.parentElement.children[0].style.height = "40px";
    setDescription("");
    setDangerous(0);
    setBackgroundColor("white");
    setDangerousColor("#1F1F1F");
  };
  // button send
  const handleSend = (e) => {
    // return original textarea style
    e.target.parentElement.parentElement.children[0].style.height = "40px";
    setDescription("");
    setDangerous(0);
    setBackgroundColor("white");
    setDangerousColor("#1F1F1F");
  };

  return (
    <div className="comment">
      <div className="comment-box">
        <div className="comment-container">
          <div className="up">
            <p className="title">---留言板---</p>
            <p className="number">2則留言</p>
          </div>
          <div className="input">
            <div>
              <label htmlFor="dangerous">危險指數:</label>
              <input
                onChange={handleDangerous}
                value={dangerous}
                type="range"
                min="1"
                max="10"
                step="1"
              />
              <p
                style={{
                  color: dangerousColor,
                  backgroundColor: backgroundColor,
                }}
              >
                {dangerous}
              </p>
            </div>
            <div className="text">
              <textarea
                onChange={handleDescription}
                onInput={autoGrow}
                placeholder="請輸入留言..."
                id="message"
                value={description}
              ></textarea>
              <div className="button">
                <button onClick={handleCancle}>取消</button>
                <button onClick={handleSend}>留言</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {array.map((d) => {
        return <Messages />;
      })}
    </div>
  );
};

export default Comment;
