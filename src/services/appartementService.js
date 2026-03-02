import axios from 'axios';

const API_URL = "http://localhost:9008/api/appartements";

class AppartementService {
    getAppartementsParBatiment(batimentId) {
        return axios.get(`${API_URL}/batiment/${batimentId}`);
    }

    findByVille(ville) {
        return axios.get(`${API_URL}/ville/${ville}`);
    }

    findAppartementsBySurfaceGreaterThan(surface) {
        return axios.get(`${API_URL}/surfaceGreaterThan/${surface}`);
    }

    createAppartement(appartement) {
        return axios.post(`${API_URL}/`, appartement);
    }

}

export default new AppartementService();