package com.lactobloom.service;

import com.lactobloom.dto.OrderDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.*;
import com.lactobloom.repository.OrderDetailRepository;
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
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public OrderDto saveOrder(OrderDto orderDto, Integer voucherId) {
        Order order = mapToEntity(orderDto);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = new User();
        if(email != null && !email.equals("anonymousUser")){
            user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                    new ResourceNotFoundException("User", "email", email));
            order.setUser(user);
        }
        if (voucherId != null) {
            Voucher existingVoucher = voucherRepository.findByVoucherIdAndDeletedFalse(voucherId).orElseThrow(() ->
                    new ResourceNotFoundException("Voucher", "Id", voucherId));
            if(existingVoucher.isAvailable() && existingVoucher.getUser() == user){
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
        List<Order> orderList = orderRepository.findByDeletedFalse();
        return orderList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        List<Order> orderList = orderRepository.findByUserUserId(user.getUserId());
        return orderList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByStaff() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User staff = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        List<Order> orderList = orderRepository.findByStaffUserIdAndDeletedFalse(staff.getUserId());
        return orderList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(int id) {
        Order order = orderRepository.findByOrderIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        return mapToDto(order);
    }

    @Override
    public OrderDto calculateTotalPrice(int orderId) {
        Order existingOrder = orderRepository.findByOrderIdAndDeletedFalse(orderId).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", orderId));
        List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderOrderId(orderId);
        double total = existingOrder.getTotalPrice();
        if(total == existingOrder.getShippingFee()){
            for(OrderDetail orderDetail : orderDetailList)
                total += orderDetail.getTotalPrice();
            if(existingOrder.getVoucher() != null)
                existingOrder.setTotalPrice(total * (1 - existingOrder.getVoucher().getDiscount()/100));
            else existingOrder.setTotalPrice(total);
        }
        return mapToDto(orderRepository.save(existingOrder));
    }

    @Override
    public OrderDto deliverOrder(int id) {
        Order existingOrder = orderRepository.findByOrderIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        if(existingOrder.getOrderStatus().equals(OrderStatus.PENDING)) {
            existingOrder.setOrderStatus(OrderStatus.DELIVERED);
            User existingUser = existingOrder.getUser();
            if(existingUser != null){
                existingUser.setPoint(existingUser.getPoint() + (int) (existingOrder.getTotalPrice()/100000));
                userRepository.save(existingUser);
            }
        }
        return mapToDto(orderRepository.save(existingOrder));
    }

    @Override
    public OrderDto cancelOrder(int id) {
        Order existingOrder = orderRepository.findByOrderIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if (existingOrder.getUser() == user && existingOrder.getOrderStatus().equals(OrderStatus.PENDING)) {
            long hoursBetween = ChronoUnit.HOURS.between(existingOrder.getOrderDate(), LocalDateTime.now());
            if (hoursBetween <= 24 || existingOrder.isCod()) {
                existingOrder.setOrderStatus(OrderStatus.CANCELLED);
                if (existingOrder.getVoucher()!=null){
                    existingOrder.getVoucher().setAvailable(true);
                    voucherRepository.save(existingOrder.getVoucher());
                }
                return mapToDto(orderRepository.save(existingOrder));
            }
        }
        return mapToDto(existingOrder);
    }

    @Override
    public OrderDto updateOrder(OrderDto orderDto, int id, Integer staffId) {
        Order existingOrder = orderRepository.findByOrderIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if(staffId != null && user.getRole().equals(Role.ADMIN)){
            User staff = userRepository.findByUserIdAndDeletedFalse(staffId).orElseThrow(() ->
                    new ResourceNotFoundException("Staff", "Id", staffId));
            existingOrder.setStaff(staff);
        }
        existingOrder.setFullName(orderDto.getFullName());
        existingOrder.setEmail(orderDto.getEmail());
        existingOrder.setPhone(orderDto.getPhone());
        existingOrder.setAddress(orderDto.getAddress());
        existingOrder.setNote(orderDto.getNote());
        return mapToDto(orderRepository.save(existingOrder));
    }

    @Override
    public void deleteOrder(int id) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", id));
        existingOrder.setDeleted(true);
        if(existingOrder.getOrderStatus().equals(OrderStatus.PENDING))
            existingOrder.setOrderStatus(OrderStatus.CANCELLED);
        Voucher voucher = existingOrder.getVoucher();
        if(voucher != null) {
            voucher.setDeleted(true);
            voucherRepository.save(voucher);
        }
        orderRepository.save(existingOrder);
    }

    public OrderDto mapToDto (Order order){
        OrderDto orderResponse = new OrderDto();
        orderResponse.setFullName(order.getFullName());
        orderResponse.setOrderId(order.getOrderId());
        orderResponse.setEmail(order.getEmail());
        orderResponse.setPhone(order.getPhone());
        orderResponse.setAddress(order.getAddress());
        orderResponse.setNote(order.getNote());
        orderResponse.setVoucherDiscount(order.getVoucher() != null ? order.getVoucher().getDiscount() : 0);
        orderResponse.setShippingFee(order.getShippingFee());
        orderResponse.setTotalPrice(order.getTotalPrice());
        orderResponse.setStatus(order.getOrderStatus().name());
        orderResponse.setOrderDate(order.getOrderDate());
        orderResponse.setStaffName(order.getStaff() != null ? order.getStaff().getFullName() : null);
        orderResponse.setCod(order.isCod());
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
        order.setCod(orderDto.isCod());
        return order;
    }
}
