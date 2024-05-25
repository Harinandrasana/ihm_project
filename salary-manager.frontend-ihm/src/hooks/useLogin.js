// import apiClient from "../services/api-client";
// import useNotification from "./useNotification";

// const useLogin = () => {
//     const displayToast = useNotification();

//     const login = async (values) => {
//         const response = await apiClient
//             .post("/users/login", values)
//             .then((res) => {
//                 console.log("the response", res.data.identifiant);
//                 if (res.data) {
//                     localStorage.setItem("users", res.data.identifiant)
//                     window.location.reload();
//                 }
//             })
//             .catch((err) => console.log(err));
//         if (response) {
//             displayToast("success", "connection reussie")
//         }
//     }

//     return { login };
// }

// export default useLogin;


import apiClient from "../services/api-client";
import useNotification from "./useNotification";


const useLogin = () => {
    const displayToast = useNotification();

    const login = async (values) => {
        try {
            console.log(values)
            const response = await apiClient.post("/login", values);
            console.log("the response :", response.data[0].identifient);
            if (response.data) {
                 localStorage.setItem("users", response.data[0].identifient);
                window.location.reload();
            }
             displayToast("success", "connection réussie");
        } catch (err) {
            console.log(err);
            displayToast("error", "Erreur lors de la connexion");
        }
    }

    return { login };
}

export default useLogin;





