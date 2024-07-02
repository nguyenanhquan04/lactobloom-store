import request from './axios';

const getAllCategories = () => {
    return request.get(`category/all`);
};

const getCategoryByProductId = (productId) => {
    return request.get(`category/getByProductId/${productId}`);
}

export { getAllCategories, getCategoryByProductId } 