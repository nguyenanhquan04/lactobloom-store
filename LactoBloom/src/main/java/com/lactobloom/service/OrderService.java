package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Order;
import com.lactobloom.repository.OrderRepository;
import com.lactobloom.service.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(int id) {
        return orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
    }

    @Override
    public Order updateOrder(Order order, int id) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));

        existingOrder.setShippingFee(order.getShippingFee());
        existingOrder.setTotalPrice(order.getTotalPrice());
        existingOrder.setPaymentMethod(order.getPaymentMethod());
        existingOrder.setAddress(order.getAddress());
        // Update other fields as needed
        return orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(int id) {
        orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        orderRepository.deleteById(id);
    }
}
