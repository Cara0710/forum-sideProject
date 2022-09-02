import axios from "axios";
const API_URL = "https://forum-side-project.herokuapp.com/api/posts";

class postService {
  // get all post data include message
  getAllPost() {
    return axios.get(API_URL);
  }

  // get one post page data include message(_post_id)
  getOnePost(_id) {
    return axios.get(API_URL + "/" + _id);
  }
}

export default new postService();
