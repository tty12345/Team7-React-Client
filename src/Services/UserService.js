import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api";

class UserDataService {
  login(user) {
    return axios.post(USER_API_BASE_URL + "/authenticate", user);
  }

  getCar(id){
    console.log("WTF")
    return axios.get("http://localhost:8080/post/getOne/"+id);
  }
}

export default new UserDataService();