import axios from "axios";

const CAR_API_BASE_URL = "http://localhost:8080/post";

class CarPostDataService {
  getCarPost() {
    return axios.get(CAR_API_BASE_URL + "/listPost");
  }
  getOwnCars(ownerId){
    return axios.get(CAR_API_BASE_URL + "/getowncars/" + ownerId);
  }
  getTopCars() {
    return axios.get(CAR_API_BASE_URL + "/hotcars");
  }
}

export default new CarPostDataService();
