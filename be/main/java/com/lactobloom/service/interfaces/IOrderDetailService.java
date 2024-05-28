package com.lactobloom.service.interfaces;

import com.lactobloom.model.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail saveOrderDetail(OrderDetail orderDetail);
    List<OrderDetail> getAllOrderDetails();
    OrderDetail getOrderDetailById(int id);
    OrderDetail updateOrderDetail(OrderDetail orderDetail, int id);
    void deleteOrderDetail(int id);
}
