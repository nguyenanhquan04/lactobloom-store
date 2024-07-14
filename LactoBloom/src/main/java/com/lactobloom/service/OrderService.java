package com.lactobloom.service;

import com.lactobloom.dto.OrderDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.*;
import com.lactobloom.repository.OrderRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.repository.VoucherRepository;
import com.lactobloom.service.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public OrderDto saveOrder(OrderDto orderDto, Integer voucherId) {
        Order order = mapToEntity(orderDto);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = new User();
        if(email != null && !email.equals("anonymousUser")){
            user = userRepository.findByEmail(email).orElseThrow(() ->
                    new ResourceNotFoundException("User", "email", email));
            order.setUser(user);
        }
        if (voucherId != null) {
            Voucher existingVoucher = voucherRepository.findById(voucherId).orElseThrow(() ->
                    new ResourceNotFoundException("Voucher", "Id", voucherId));
            if(existingVoucher.isAvailable() && existingVoucher.getUser().getUserId() == user.getUserId()){
                existingVoucher.setAvailable(false);
                Voucher voucher = voucherRepository.save(existingVoucher);
                order.setVoucher(voucher);
            }
        }
        Order newOrder = orderRepository.save(order);
        return mapToDto(newOrder);
    }

    @Override
    public List<OrderDto> getAllOrders() {
        List<Order> orderList = orderRepository.findAll();
        return orderList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        List<Order> orderList = orderRepository.findByUserUserId(user.getUserId());
        return orderList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(int id) {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        return mapToDto(order);
    }

    @Override
    public OrderDto deliverOrder(int id) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        existingOrder.setOrderStatus(OrderStatus.DELIVERED);
        return mapToDto(orderRepository.save(existingOrder));
    }

    @Override
    public OrderDto cancelOrder(int id) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if (existingOrder.getUser().equals(user) && existingOrder.getOrderStatus().equals(OrderStatus.PENDING)) {
            long hoursBetween = ChronoUnit.HOURS.between(existingOrder.getOrderDate(), LocalDateTime.now());
            if (hoursBetween <= 24) {
                existingOrder.setOrderStatus(OrderStatus.CANCELLED);
                user.setPoint(user.getPoint() - (int) (existingOrder.getTotalPrice()/100000));
                userRepository.save(user);
                return mapToDto(orderRepository.save(existingOrder));
            }
        }
        return null;
    }

    @Override
    public OrderDto updateOrder(OrderDto orderDto, int id) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        existingOrder.setFullName(orderDto.getFullName());
        existingOrder.setEmail(orderDto.getEmail());
        existingOrder.setPhone(orderDto.getPhone());
        existingOrder.setAddress(orderDto.getAddress());
        existingOrder.setNote(orderDto.getNote());
        existingOrder.setShippingFee(orderDto.getShippingFee());
        existingOrder.setTotalPrice(orderDto.getTotalPrice());
        existingOrder.setOrderStatus(OrderStatus.valueOf(orderDto.getStatus()));
        return mapToDto(orderRepository.save(existingOrder));
    }

    @Override
    public void deleteOrder(int id) {
        orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        orderRepository.deleteById(id);
    }

    public OrderDto mapToDto (Order order){
        OrderDto orderResponse = new OrderDto();
        orderResponse.setFullName(order.getFullName());
        orderResponse.setOrderId(order.getOrderId());
        orderResponse.setEmail(order.getEmail());
        orderResponse.setPhone(order.getPhone());
        orderResponse.setAddress(order.getAddress());
        orderResponse.setNote(order.getNote());
        orderResponse.setShippingFee(order.getShippingFee());
        orderResponse.setTotalPrice(order.getTotalPrice());
        orderResponse.setStatus(order.getOrderStatus().name());
        orderResponse.setOrderDate(order.getOrderDate());
        return orderResponse;
    }

    private Order mapToEntity(OrderDto orderDto){
        Order order = new Order();
        order.setFullName(orderDto.getFullName());
        order.setEmail(orderDto.getEmail());
        order.setPhone(orderDto.getPhone());
        order.setAddress(orderDto.getAddress());
        order.setNote(orderDto.getNote());
        order.setShippingFee(orderDto.getShippingFee());
        order.setTotalPrice(orderDto.getShippingFee());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(orderDto.getOrderDate());
        return order;
    }
}
