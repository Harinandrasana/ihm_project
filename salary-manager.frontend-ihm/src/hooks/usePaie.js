import apiClient from "../services/api-client";

const usePaie = () => {
    const checkPaieIfExist = async (id) => {
        try {
            const response = await apiClient.get(`/paies/${id}`);
            // Vérifier si la réponse contient des données
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return { checkPaieIfExist };
};

export default usePaie;
