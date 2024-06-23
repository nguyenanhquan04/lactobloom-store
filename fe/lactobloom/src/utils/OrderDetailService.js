import request from './axios';

const orderProducts = (orderId, config) => {
    return request.get(`order-detail/order/${orderId}`, config);
}

export { orderProducts } 