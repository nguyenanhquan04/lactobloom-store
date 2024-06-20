import request from './axios';

const getAvailableVoucher = () => {
    return request.get(`voucher/available`);
}

const exchangeVoucher = (voucherId, config) => {
    return request.put(`voucher/exchange/${voucherId}`, config);
}

const myVoucher = (config) => {
    return request.get(`voucher/myVoucher`, config);
}

export { getAvailableVoucher, exchangeVoucher, myVoucher } 