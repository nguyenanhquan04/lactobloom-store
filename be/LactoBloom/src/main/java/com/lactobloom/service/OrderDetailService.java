package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.OrderDetail;
import com.lactobloom.repository.OrderDetailRepository;
import com.lactobloom.service.interfaces.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService implements IOrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public OrderDetail saveOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail getOrderDetailById(int id) {
        return orderDetailRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("OrderDetail", "Id", id));
    }

    @Override
    public OrderDetail updateOrderDetail(OrderDetail orderDetail, int id) {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("OrderDetail", "Id", id));

        existingOrderDetail.setQuantity(orderDetail.getQuantity());
        existingOrderDetail.setTotalPrice(orderDetail.getTotalPrice());
        // Update other fields as needed
        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    public void deleteOrderDetail(int id) {
        orderDetailRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("OrderDetail", "Id", id));
        orderDetailRepository.deleteById(id);
    }
}
