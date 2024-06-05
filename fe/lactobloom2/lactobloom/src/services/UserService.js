import Axios from "./customize-axios";

const loginApi = (email, password) => {
    return Axios.post("/api/login", {email, password});
}

export {loginApi}