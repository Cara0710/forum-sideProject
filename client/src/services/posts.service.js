import axios from "axios";
const API_URL = "http://localhost:8080/api/posts";

class postService {
  // get all post data
  getAllPost() {
    return axios.get(API_URL);
  }

  // get one post page data(_post_id)
  getOnePost(_id) {
    return axios.get(API_URL + "/" + _id);
  }
}

export default new postService();
