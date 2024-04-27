import axios from "axios";

// Définissez votre constante BASE_URL
export const BASE_URL = "http://localhost:5000/api";

// Créez une instance Axios
const apiClient = axios.create({
    baseURL: BASE_URL,
});

export default apiClient;