import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:8080'
});

export default instance;