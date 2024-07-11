import request from './axios';

const saveOrder = (voucherId, data, config) => {
    return request.post(`order/save${voucherId ? `?voucherId=${voucherId}` : ""}`,data, config);
}

export { saveOrder } 