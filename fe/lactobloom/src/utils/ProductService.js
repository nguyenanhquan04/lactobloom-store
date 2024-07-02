import request from './axios';

const getAllProducts = () => {
    return request.get(`product/all`);
};

const searchProducts = (searchValue) => {
    return request.get(`product/search?productName=${searchValue}`);
};

const getProductsByCategoryId = (categoryId) => {
    return request.get(`product/category/${categoryId}`);
};

const getProductsByBrandId = (brandId) => {
    return request.get(`product/brand/${brandId}`);
}

export { getAllProducts, searchProducts, getProductsByCategoryId, getProductsByBrandId };