import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/posts";

class PostAuthService {
  // add newPost
  newPost(title, description) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    // req with token
    return axios.post(
      API_URL,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // find user own post(_user_id)
  findUserPost(_id) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // add new comment (_post_id)
  newComment(_id, dangerous, content) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/comment/" + _id,
      {
        dangerous,
        content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new PostAuthService();
