import axios from "axios";
const API_URL = "https://forum-side-project.herokuapp.com/api/auth/user";

class UserAuthService {
  // edit user information(_user_id)
  editUser(_id, username, password) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new UserAuthService();
