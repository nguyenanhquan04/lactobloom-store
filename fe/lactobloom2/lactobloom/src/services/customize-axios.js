import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://reqres.in'
});

export default instance;