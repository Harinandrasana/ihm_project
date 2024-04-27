import apiClient from "../services/api-client";
import useNotification from "./useNotification";

const useLogin = () => {
    const displayToast = useNotification();

    const login = async (values) => {
        const response = await apiClient
            .post("/users/login", values)
            .then((res) => {
                console.log("the response", res.data.userId);
                if (res.data) {
                    localStorage.setItem("users", res.data.userId)
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
