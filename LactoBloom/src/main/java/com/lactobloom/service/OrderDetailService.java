package com.lactobloom.service;

import com.lactobloom.dto.OrderDetailDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Order;
import com.lactobloom.model.OrderDetail;
import com.lactobloom.model.Product;
import com.lactobloom.model.User;
import com.lactobloom.repository.OrderDetailRepository;
import com.lactobloom.repository.OrderRepository;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailService implements IOrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public OrderDetailDto saveOrderDetail(OrderDetailDto orderDetailDto, int orderId, int productId) {
        OrderDetail orderDetail = mapToEntity(orderDetailDto);
        Order existingOrder = orderRepository.findByOrderIdAndDeletedFalse(orderId).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", orderId));
        Product product = productRepository.findByProductIdAndDeletedFalse(productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        if(product.getStock() < orderDetail.getQuantity())
            return null;
        product.setStock(product.getStock() - orderDetail.getQuantity());
        Product boughtProduct = productRepository.save(product);
        orderDetail.setPreOrder(product.isPreOrder());
        orderDetail.setTotalPrice((product.getPrice() * (1 - product.getDiscount()/100)) * orderDetail.getQuantity());
        orderDetail.setOrder(existingOrder);
        orderDetail.setProduct(boughtProduct);
        return mapToDto(orderDetailRepository.save(orderDetail));
    }

    @Override
    public List<OrderDetailDto> getOrderDetailsByOrderForMember(int orderId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Order existingOrder = orderRepository.findById(orderId).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", orderId));
        if(existingOrder.getUser() == user) {
            List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderOrderId(orderId);
            return orderDetailList.stream().map(this::mapToDto).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<OrderDetailDto> getOrderDetailsByOrder(int orderId) {
        Order existingOrder = orderRepository.findByOrderIdAndDeletedFalse(orderId).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", orderId));
        List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderOrderId(existingOrder.getOrderId());
        return orderDetailList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDetailDto> getAllOrderDetails() {
        List<OrderDetail> orderDetailList = orderDetailRepository.findAll();
        return orderDetailList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public OrderDetailDto getOrderDetailById(int id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("OrderDetail", "Id", id));
        return mapToDto(orderDetail);
    }

    private OrderDetailDto mapToDto (OrderDetail orderDetail){
        OrderDetailDto orderDetailResponse = new OrderDetailDto();
        orderDetailResponse.setOrderDetailId(orderDetail.getOrderDetailId());
        orderDetailResponse.setProductName(orderDetail.getProduct().getProductName());
        orderDetailResponse.setQuantity(orderDetail.getQuantity());
        orderDetailResponse.setTotalPrice(orderDetail.getTotalPrice());
        orderDetailResponse.setPreOrder(orderDetail.isPreOrder());
        return orderDetailResponse;
    }

    private OrderDetail mapToEntity(OrderDetailDto orderDetailDto){
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setQuantity(orderDetailDto.getQuantity());
        return orderDetail;
    }
}
