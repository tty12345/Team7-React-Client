import axios from "axios";

const CARPOST_API_BASE_URL = "https://teamsevenad.herokuapp.com/post";
const MAIN_URL = "https://teamsevenad.herokuapp.com";

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

    searchByPref(id,searchobject){
      return axios.post(CARPOST_API_BASE_URL+"/listPostByPref/"+id,searchobject);
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

      return axios.post(MAIN_URL+"/data/estimate", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }});
    }

    deletePost(id){
      return axios.delete(CARPOST_API_BASE_URL + "/deletePost/" + id);
    }

    likePost(user,id){
      return axios.post(MAIN_URL +"/like/addLike/" + id, user);
    }

    unLikePost(user,id){
      return axios.post(MAIN_URL + "/like/deleteLike/" + id,user);
    }

    checkLikeStatus(user,id){
      return axios.post(MAIN_URL +"/like/checkLike/" + id,user);
    }

    savePreference(preferences){
      return axios.post(MAIN_URL +"/preference/save", preferences);
    }

    checkCurrentPreference(userId){
      return axios.get(MAIN_URL +"/preference/checkPreference/"+ userId);
    }

    getOffer(carpostId){
      return axios.get(CARPOST_API_BASE_URL + "/getoffers/" + carpostId);
    }

    getWatchList(userId){
      return axios.get(CARPOST_API_BASE_URL + "/watchList/" + userId);
    }

    getCarPost() {
      return axios.get(CARPOST_API_BASE_URL + "/listPost");
    }
    getOwnCars(ownerId){
      return axios.get(CARPOST_API_BASE_URL + "/getowncars/" + ownerId);
    }
    getTopCars() {
      return axios.get(CARPOST_API_BASE_URL + "/hotcars");
    }
}

export default new PostDataService();
