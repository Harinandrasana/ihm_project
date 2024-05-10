import apiClient from "../services/api-client";
import useNotification from "./useNotification";

const useRegister = () => {
    const displayToast = useNotification();

    const register = async (values) => {
        const response = await apiClient
            .post("/users/addLog", values)
            .then((res) => {
            })
            .catch((err) => console.log(err));
        if (response) {
            displayToast("success", "enregistrement reussie")
        }
    }

    return { register };
}

export default useRegister
