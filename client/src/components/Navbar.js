import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleNavColor = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#4D4D4D" : "#202020",
      borderRadius: isActive ? "50px" : "none",
    };
  };
  return (
    <nav>
      <ul>
        <div className="left">
          <li>
            <NavLink to="/home">
              <img src="./icons/logo-icon.png" alt="logo-icon" />
            </NavLink>
          </li>
        </div>
        <div className="right">
          <li>
            <NavLink style={handleNavColor} to="/help">
              <img src="./icons/helper-icon.png" alt="helper-icon" />
              <p>使用須知</p>
            </NavLink>
          </li>
          <li>
            <NavLink style={handleNavColor} to="/forum">
              <img src="./icons/forum-icon.png" alt="forun-icon" />
              <p>防詐論壇</p>
            </NavLink>
          </li>
          <li>
            <NavLink style={handleNavColor} to="/register">
              <img src="./icons/register-icon.png" alt="register-icon" />
              <p>註冊</p>
            </NavLink>
          </li>
          <li>
            <NavLink style={handleNavColor} to="/login">
              <img src="./icons/login-icon.png" alt="login-icon" />
              <p>登入</p>
            </NavLink>
          </li>
          {/* <li>
            <NavLink style={handleNavColor} to="/profile">
              <img src="./icons/profile-icon.png" alt="profile-icon" />
              <p>個人檔案</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/home">
              <img src="./icons/logout-icon.png" alt="logout-icon" />
              <p>登出</p>
            </NavLink>
          </li> */}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
