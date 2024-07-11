import request from './axios';

const orderProducts = (orderId, config) => {
    return request.get(`order-detail/myOrder/${orderId}`, config);
}

export { orderProducts } 