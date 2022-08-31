import React, { useState } from "react";
import AuthService from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // error message
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //get input
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  // register
  const handleRegister = () => {
    AuthService.register(username, password)
      .then((d) => {
        window.alert("註冊成功，將幫你導向登入頁面。");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data);
      });
  };

  return (
    <div className="register">
      <div className="register-box">
        <div className="register-container">
          <div className="title">
            <h1>歡迎註冊</h1>
          </div>
          <div className="username">
            <p>使用者名稱:</p>
            <input
              onChange={handleUsername}
              placeholder="請輸入使用者名稱"
              type="text"
              id="username"
            />
          </div>
          <div className="password">
            <p>密碼:</p>
            <input
              onChange={handlePassword}
              placeholder="請輸入密碼"
              type="password"
              id="password"
            />
          </div>
          {message && <div className="error">{message}</div>}
          <div className="button">
            <button onClick={handleRegister}>註冊</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
