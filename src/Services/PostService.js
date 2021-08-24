import axios from "axios";

const CARPOST_API_BASE_URL = "http://localhost:8080/post";

class PostDataService {

    getPosts() {
      return axios.get(CARPOST_API_BASE_URL + "/listPost");
    }

    createPost(carPosting, Id) {
      console.log(Id);
      return axios.post(CARPOST_API_BASE_URL + "/savePost/" + Id, carPosting);
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

    search(searchobject){
      console.log(searchobject);
      return axios.post(CARPOST_API_BASE_URL+"/listPost",searchobject);
    }

    getEstimate(to_estimate) {
      const formData = new FormData();

      console.log(to_estimate[0]);
      console.log(to_estimate[1]);
      console.log(to_estimate[2]);
      console.log(to_estimate[3]);
      console.log(to_estimate[4]);
      console.log(to_estimate[5]);

      formData.append("depreciation", to_estimate[0]);
      formData.append('age', to_estimate[1]);
      formData.append('mileage', to_estimate[2]);
      formData.append('engineCapacity', to_estimate[3]);
      formData.append('brand', to_estimate[4]);
      formData.append('category', to_estimate[5]);

      return axios.post("http://localhost:8080/data/estimate", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }});
    }
}

export default new PostDataService();
