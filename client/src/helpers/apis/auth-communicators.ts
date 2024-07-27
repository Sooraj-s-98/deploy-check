import axios from 'axios'

export const loginUser = async(email: string, password: string) => {
    const response = await axios.post("/user/login", {email, password})
    if (response.status !== 200) {
        throw new Error("Unable to login")
    }
    const data = await response.data;
    return data;
}

export const signupUser = async (name: string, email: string, password: string) => {
    const response = await axios.post("/user/signup", { name, email, password });
    if (response.status !== 201) {
        throw new Error("Unable to Signup");
    }
    const data = await response.data;
    return data;
}

export const logoutUser = async () => {
    const response = await axios.get("/user/logout");
    if (response.status !== 200) {
        throw new Error("Unable to logout");
    }
    const data = await response.data;
    return data;
}

export const checkAuthStatus = async () => {
    const response = await axios.get("/user/auth-status");
    if (response.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await response.data;
    return data;
}