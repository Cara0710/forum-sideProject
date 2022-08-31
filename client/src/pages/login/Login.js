import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.services";

const Login = ({ setCurrentUser }) => {
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

  // Login
  const handleLogin = () => {
    AuthService.login(username, password)
      .then((d) => {
        if (d.data.token) {
          localStorage.setItem("user", JSON.stringify(d.data));
          setCurrentUser(AuthService.getCurrentUser());
        }
        window.alert("登入成功，將把你導向論壇區");
        navigate("/forum");
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data);
      });
  };
  return (
    <div className="login">
      <div className="login-box">
        <div className="login-container">
          <div className="title">
            <h1>歡迎登入</h1>
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
            <button onClick={handleLogin}>登入</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
