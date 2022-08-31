import React from "react";

const Myprofile = ({ handleEditPage, currentUser }) => {
  return (
    <div className="myprofile">
      <div className="myprofile-box">
        <div className="myprofile-container">
          <table>
            <tbody>
              <tr>
                <th>註冊日期:</th>
                <td>{`${currentUser.user.date.slice(
                  0,
                  4
                )} / ${currentUser.user.date.slice(
                  5,
                  7
                )} / ${currentUser.user.date.slice(8, 10)}`}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>使用者名稱:</th>
                <td>{currentUser.user.username}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>密碼:</th>
                <td>{currentUser.user.password}</td>
              </tr>
            </tbody>
          </table>
          <div className="edit-button">
            <button onClick={() => handleEditPage(true)}>編輯</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
