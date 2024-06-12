package com.lactobloom.service.interfaces;

import com.lactobloom.dto.OrderDto;
import com.lactobloom.model.Order;

import java.util.List;

public interface IOrderService {
    OrderDto saveOrder(OrderDto orderDto, int userId, int voucherId);
    List<OrderDto> getAllOrders();
    OrderDto getOrderById(int id);
    OrderDto updateOrder(OrderDto orderDto, int id, int userId, int voucherId);
    void deleteOrder(int id);
}
