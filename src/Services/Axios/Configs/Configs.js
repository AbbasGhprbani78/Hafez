import axios from "axios";
const access = localStorage.getItem("access");


export const signUpLogin = axios.create({
    baseURL: "https://.ariisco.com",
    headers: {
        "Content-Type": "application/json",
    },
})


signUpLogin.interceptors.response.use((response) => {
    return response
},
    (err) => {
        console.log("err", err);

        const status = err.response.status
        if (status === 401) {
            //codes
        } else if (status === 500) {
            //codes
        } else if (status === 404) {
            //codes
        }
        return Promise.reject(err)
    }
)



export const apiRequest = axios.create({
    baseURL: "https://.ariisco.com",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer access`
    },
})



apiRequest.interceptors.response.use((response) => {
    return response
},
    (err) => {
        console.log("err", err);

        const status = err.response.status
        if (status === 401) {
            //codes
        } else if (status === 500) {
            //codes
        } else if (status === 404) {
            //codes
        }
        return Promise.reject(err)
    }
)

