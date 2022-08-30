import React, { useState } from "react";

const EditMessage = ({ setEditPage, editPage }) => {
  const [description, setDescription] = useState("");
  const [dangerous, setDangerous] = useState(0);
  const [dangerousColor, setDangerousColor] = useState("#1F1F1F");
  const [backgroundColor, setBackgroundColor] = useState("white");

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
    setEditPage(false);
  };
  // button send
  const handleSend = (e) => {
    setEditPage(false);
  };
  return (
    <div className="editPage">
      <div className={editPage ? "editPage-box moveBox" : "editPage-box"}>
        <div className="editPage-container">
          <div className="new">
            <h1>編輯貼文</h1>
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
          </div>

          <div className="textarea">
            <textarea
              onChange={handleDescription}
              value={description}
              placeholder="請輸入留言..."
              id="message"
              rows="10"
            ></textarea>
          </div>
          <div className="button">
            <button onClick={handleCancle}>取消</button>
            <button onClick={handleSend}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMessage;
