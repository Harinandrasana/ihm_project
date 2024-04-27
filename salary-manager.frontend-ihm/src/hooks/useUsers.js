export const connectedUser = localStorage.getItem("users");

export const getEnregistredUser = () => {
    const user = localStorage.getItem("users");
    return user;
};

export const signOut = (str) => {
    localStorage.removeItem(str);
};

