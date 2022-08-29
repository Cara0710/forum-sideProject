import React from "react";

const Myprofile = ({ handleEditPage }) => {
  return (
    <div className="myprofile">
      <div className="myprofile-box">
        <div className="myprofile-container">
          <table>
            <div>
              <tr>
                <th>註冊日期:</th>
                <td>2022/08/15</td>
              </tr>
            </div>
            <div>
              <tr>
                <th>使用者名稱:</th>
                <td>Ben</td>
              </tr>
            </div>
            <div>
              <tr>
                <th>密碼:</th>
                <td>
                  202/082/082/082/082/082/082/082/082/082/082/0822/082/082/082/082/082/082/082/082/08/15
                </td>
              </tr>
            </div>
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
