import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api";

class UserDataService {
  login(user) {
    return axios.post(USER_API_BASE_URL + "/authenticate", user);
  }
  logout(){
    return axios.post(USER_API_BASE_URL + "/logout");
  }
  save(user) {
    return axios.post(USER_API_BASE_URL + "/signup", user);
  }
  submitOffer(currentOffer,id){
    return axios.post("http://localhost:8080/post/saveOffer/"+id,currentOffer);
  }
  checkOwnOffer(currentOffer, id){
    return axios.post("http://localhost:8080/post/checkOwnOffer/"+id,currentOffer);
  }
  getCar(id){
    return axios.get("http://localhost:8080/post/getOne/" + id);
  }
  getNotification(userId){
    return axios.get("http://localhost:8080/notification/listNotification/" + userId);
  }
  googleRegister(){
    return axios.get("http://localhost:8080/post/getOne/")
  }
}

export default new UserDataService();