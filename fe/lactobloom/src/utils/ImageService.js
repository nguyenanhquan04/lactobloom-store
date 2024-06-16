import request from './axios';

const getImagesByProductId = (productId) => {
    return request.get(`image/get/product/${productId}`);
}

export { getImagesByProductId } 