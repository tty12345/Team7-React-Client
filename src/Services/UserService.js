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
  submitOffer(currentOffer){
    return axios.post("http://localhost:8080/post/saveOffer",currentOffer);
  }
  getCar(id){
    return axios.get("http://localhost:8080/post/getOne/" + id);
  }
  getNotification(){
    return axios.get("http://localhost:8080/notification/listNotification");
  }
}

export default new UserDataService();