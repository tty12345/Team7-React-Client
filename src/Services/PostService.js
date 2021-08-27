import axios from "axios";

const CARPOST_API_BASE_URL = "http://localhost:8080/post";

class PostDataService {

    getPosts() {
      return axios.get(CARPOST_API_BASE_URL + "/listPost");
    }

    createPost(carPosting, Id) {
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

    search(searchobject){
      return axios.post(CARPOST_API_BASE_URL+"/listPost",searchobject);
    }

    getEstimate(to_estimate) {
      const formData = new FormData();

      // console.log(to_estimate[0]);
      // console.log(to_estimate[1]);
      // console.log(to_estimate[2]);
      // console.log(to_estimate[3]);
      // console.log(to_estimate[4]);
      // console.log(to_estimate[5]);

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

    deletePost(id){
      return axios.delete(CARPOST_API_BASE_URL + "/deletePost/" + id);
    }

    likePost(user,id){
      return axios.post("http://localhost:8080/like" + "/addLike/" + id, user);
    }

    unLikePost(user,id){
      return axios.post("http://localhost:8080/like" + "/deleteLike/" + id,user);
    }

    checkLikeStatus(user,id){
      return axios.post("http://localhost:8080/like" + "/checkLike/" + id,user);
    }

    savePreference(preferences){
      return axios.post("http://localhost:8080/preference/save", preferences);
    }

    checkCurrentPreference(userId){
      return axios.get("http://localhost:8080/preference/checkPreference/"+ userId);
    }

    getOffer(carpostId){
      return axios.get(CARPOST_API_BASE_URL + "/getoffers/" + carpostId);
    }
}

export default new PostDataService();
