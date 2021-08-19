import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api";

class UserDataService {
  login(user) {
    return axios.post(USER_API_BASE_URL + "/authenticate", user);
  }
}

export default new UserDataService();