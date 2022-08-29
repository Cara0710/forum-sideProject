import React from "react";

const Register = () => {
  return (
    <div className="register">
      <div className="register-box">
        <div className="register-container">
          <div className="title">
            <h1>歡迎註冊</h1>
          </div>
          <div className="username">
            <p>使用者名稱:</p>
            <input placeholder="請輸入使用者名稱" type="text" id="username" />
          </div>
          <div className="password">
            <p>密碼:</p>
            <input placeholder="請輸入密碼" type="password" id="password" />
          </div>
          <div className="button">
            <button>註冊</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
