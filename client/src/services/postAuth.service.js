import axios from "axios";
const API_URL = "https://forum-side-project.herokuapp.com/api/auth/posts";

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

  // update user post(_post_id)
  updatePost(_id, title, description) {
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

  // delete post(_post_id)
  deletePost(_id) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // -------comment------

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

  // updata comment(_comment_id)
  updateComment(_id, dangerous, content) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
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

  // delete comment(_comment_id)
  deleteComment(_id) {
    // get token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/comment/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostAuthService();
