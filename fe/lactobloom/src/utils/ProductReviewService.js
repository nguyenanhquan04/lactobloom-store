import request from './axios';

const getProductReviewByProductId = (productId) => {
    return request.get(`product-review/product/${productId}`);
}

const saveProductReview = (productId, reviewData, config) => {
    return request.post(`product-review/save/product/${productId}`, reviewData, config);
}

export { getProductReviewByProductId, saveProductReview } 