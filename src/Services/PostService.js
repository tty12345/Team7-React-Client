import axios from "axios";

const CARPOST_API_BASE_URL = "http://localhost:8080/post";

class PostDataService {

    getPosts() {
      return axios.get(CARPOST_API_BASE_URL + "/listPost");
    }

    createPost(carPosting) {
      return axios.post(CARPOST_API_BASE_URL + "/savePost", carPosting);
    }

    uploadImage(ImageFile) {
      return axios.post(CARPOST_API_BASE_URL + "/saveImage", ImageFile);
    }
    
    getPostById(id) {
      return axios.get(CARPOST_API_BASE_URL + "/offer/" + id);
    }

    updatePost(id, carPosting) {
      return axios.put(CARPOST_API_BASE_URL + "/editPost/" + id, carPosting);
    }

    deletePost(id) {
      return axios.delete(CARPOST_API_BASE_URL + "/deletePost/" + id);
    }
}

export default new PostDataService();
