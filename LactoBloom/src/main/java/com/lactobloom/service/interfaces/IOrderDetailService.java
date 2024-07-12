package com.lactobloom.service.interfaces;

import com.lactobloom.dto.OrderDetailDto;
import com.lactobloom.model.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetailDto saveOrderDetail(OrderDetailDto orderDetailDto, int orderId, int productId);
    List<OrderDetailDto> getOrderDetailsByOrderForMember(int orderId);
    List<OrderDetailDto> getOrderDetailsByOrder(int orderId);
    List<OrderDetailDto> getAllOrderDetails();
    OrderDetailDto getOrderDetailById(int id);
    OrderDetailDto updateOrderDetail(OrderDetailDto orderDetailDto, int id, int orderId, int productId);
    void deleteOrderDetail(int id);
}
