import axios from "axios";

const FLASK_API_BASE_URL = "http://springbootbackend-env.eba-b2jcsvnv.us-east-1.elasticbeanstalk.com/data";

class HomeService {

    getCoeTitle() {
        return axios.get(FLASK_API_BASE_URL + "/coeTitle");
    }

    getCoePrices() {
        return axios.get(FLASK_API_BASE_URL + "/coePrices");
    }

}

export default new HomeService();
