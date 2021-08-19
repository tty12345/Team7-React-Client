import axios from "axios";

const CARPOST_API_BASE_URL = "http://localhost:8080/api/post";

class PostDataService {

    getPosts() {
      return axios.get(CARPOST_API_BASE_URL + "/listPost");
    }

    createPost(carPosting) {
      return axios.post(CARPOST_API_BASE_URL + "/savePost", carPosting);
    }
    
    getPostById(id) {
      return axios.get(CARPOST_API_BASE_URL + "/offer/" + id);
    }
}

export default new PostDataService();
