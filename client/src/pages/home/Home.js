import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="title">
        <div className="big">
          資訊對稱的時代
          <br />
          別想騙我去柬埔寨
        </div>
        <div className="subtitle">
          🖐🖐嗨，歡迎來到防詐談 <br />
          你也受夠了求職詐騙嗎，跟大家一同討論吧!
        </div>
      </div>
      <div className="down-box">
        <div onClick={() => navigate("/forum")} className="entrance">
          進入求職防詐論壇
        </div>
      </div>
    </div>
  );
};

export default Home;
