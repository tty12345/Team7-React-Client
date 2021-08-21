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
    return axios.post(USER_API_BASE_URL + "/saveOffer",currentOffer);
  }
  getCar(id){
    return axios.get(USER_API_BASE_URL + "/getOne/" + id);
  }
}

export default new UserDataService();