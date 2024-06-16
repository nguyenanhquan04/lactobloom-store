import request from './axios';

const getAllBrands = () => {
    return request.get(`brand/all`);
};

const getBrandByProductId = (productId) => {
    return request.get(`brand/getByProductId/${productId}`);
}

export { getAllBrands, getBrandByProductId } 