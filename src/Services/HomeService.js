import axios from "axios";

const FLASK_API_BASE_URL = "http://localhost:8080/data";

class HomeService {

    getCoeTitle() {
        return axios.get(FLASK_API_BASE_URL + "/coeTitle");
    }

    getCoePrices() {
        return axios.get(FLASK_API_BASE_URL + "/coePrices");
    }

}

export default new HomeService();
