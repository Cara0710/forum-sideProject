import axios from "axios";
const API_URL = "https://forum-side-project.herokuapp.com/api/user";

class AuthService {
  // login
  login(username, password) {
    //return a promise
    return axios.post(API_URL + "/login", {
      username,
      password,
    });
  }
  //  logout
  logout() {
    localStorage.removeItem("user");
  }
  //   register
  register(username, password) {
    // return a promise
    return axios.post(API_URL + "/register", {
      username,
      password,
    });
  }

  //   get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
