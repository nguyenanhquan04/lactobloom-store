import Axios from "./customize-axios2";

const getAllProducts = () => {
    return Axios.get("/product/all")
}

const getProductById = (id) => {
    return Axios.get("/product/get/" + id)
}

export {getAllProducts, getProductById}