package com.lactobloom.service.interfaces;

import com.lactobloom.model.Order;

import java.util.List;

public interface IOrderService {
    Order saveOrder(Order order);
    List<Order> getAllOrders();
    Order getOrderById(int id);
    Order updateOrder(Order order, int id);
    void deleteOrder(int id);
}
