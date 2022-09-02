import React, { useState } from "react";
import PostAuthService from "../../../services/postAuth.service";

const EditMessage = ({
  setEditPage,
  editPage,
  data,
  postDataStatus,
  setPostData,
}) => {
  const [description, setDescription] = useState(data.content);
  const [dangerous, setDangerous] = useState(data.dangerous);
  const [dangerousColor, setDangerousColor] = useState(initializeColor());
  const [backgroundColor, setBackgroundColor] = useState(
    initializeBackgroundColor()
  );

  // error message
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  // set initialize color
  function initializeBackgroundColor() {
    if (data.dangerous >= 1 && data.dangerous < 5) {
      return "#24FF00";
    } else if (data.dangerous >= 5 && data.dangerous < 7.5) {
      return "#F68500";
    } else {
      return "#EF3737";
    }
  }
  function initializeColor() {
    if (data.dangerous >= 1 && data.dangerous < 5) {
      return "black";
    } else {
      return "white";
    }
  }

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

  // send updated message
  const handleSend = (e) => {
    postDataStatus.current = true;
    setLoading(true);
    PostAuthService.updateComment(data._id, dangerous, description)
      .then((d) => {
        const newData = d.data;
        setPostData((pre) => {
          const updataComments = pre.comments.map((d) => {
            if (d._id === data._id) {
              return newData;
            } else {
              return d;
            }
          });
          return { ...pre, comments: updataComments };
        });
        setLoading(false);
        setEditPage(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        setMessage(e.response.data);
      });
  };

  return (
    <div className="editPage">
      {/* loading css animation */}
      {loading && (
        <div className="loading-box">
          <div className="loading la-ball-8bits la-2x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className={editPage ? "editPage-box moveBox" : "editPage-box"}>
        <div className="editPage-container">
          <div className="new">
            <h1>編輯留言</h1>
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
          {message && <div className="error">{message}</div>}
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
