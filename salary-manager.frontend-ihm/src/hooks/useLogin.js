import apiClient from "../services/api-client";
import useNotification from "./useNotification";

const useLogin = () => {
    const displayToast = useNotification();

    const login = async (values) => {
        const response = await apiClient
            .post("/login", values)
            .then((res) => {
                console.log("the response", res.data.identifiant);
                if (res.data) {
                    localStorage.setItem("users", res.data.identifiant)
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
        if (response) {
            displayToast("success", "connection reussie")
        }
    }

    return { login };
}

export default useLogin;
