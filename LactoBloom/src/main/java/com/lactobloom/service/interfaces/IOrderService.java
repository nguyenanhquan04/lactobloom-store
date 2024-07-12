package com.lactobloom.service.interfaces;

import com.lactobloom.dto.OrderDto;
import com.lactobloom.model.Order;

import java.util.List;

public interface IOrderService {
    OrderDto saveOrder(OrderDto orderDto, Integer voucherId);
    List<OrderDto> getAllOrders();
    List<OrderDto> getOrdersByUser();
    OrderDto getOrderById(int id);
    OrderDto deliverOrder(int id);
    OrderDto cancelOrder(int id);
    OrderDto updateOrder(OrderDto orderDto, int id);
    void deleteOrder(int id);
}
