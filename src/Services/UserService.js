import axios from "axios";

const USER_API_BASE_URL = "http://springbootbackend-env.eba-b2jcsvnv.us-east-1.elasticbeanstalk.com/api";
const MAIN_URL = "http://springbootbackend-env.eba-b2jcsvnv.us-east-1.elasticbeanstalk.com";

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
    return axios.post(MAIN_URL + "/post/saveOffer/"+id,currentOffer);
  }
  checkOwnOffer(currentOffer, id){
    return axios.post(MAIN_URL + "/post/checkOwnOffer/"+id,currentOffer);
  }
  getCar(id){
    return axios.get(MAIN_URL + "/post/getOne/" + id);
  }
  getNotification(userId){
    return axios.get(MAIN_URL + " /notification/listNotification/" + userId);
  }
}

export default new UserDataService();