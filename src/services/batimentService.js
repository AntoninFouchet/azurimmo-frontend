import axios from 'axios';

const API_URL = "http://localhost:9008/api/batiments";

class BatimentService {

    getAllBatiments() {
        return axios.get(`${API_URL}/all`);
    }

    getBatimentById(batimentId) {
        return axios.get(`${API_URL}/${batimentId}`);
    }

    createBatiment(batiment) {
        return axios.post(`${API_URL}/`, batiment);
    }

    getAppartementsParBatiment(batimentId) {
        return axios.get(`${API_URL}/${batimentId}/appartements`);
    }
}
export default new BatimentService();