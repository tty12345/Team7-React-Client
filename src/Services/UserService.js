import axios from "axios";

const USER_API_BASE_URL = "https://teamsevenad.herokuapp.com/api";

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
    return axios.post(USER_API_BASE_URL + "/saveOffer/"+id,currentOffer);
  }
  checkOwnOffer(currentOffer, id){
    return axios.post(USER_API_BASE_URL + "/checkOwnOffer/"+id,currentOffer);
  }
  getCar(id){
    return axios.get(USER_API_BASE_URL +"/getOne/" + id);
  }
  getNotification(userId){
    return axios.get("https://teamsevenad.herokuapp.com/notification/listNotification/" + userId);
  }
}

export default new UserDataService();