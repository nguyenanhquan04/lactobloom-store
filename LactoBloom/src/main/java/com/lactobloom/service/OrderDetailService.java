package com.lactobloom.service;

import com.lactobloom.dto.OrderDetailDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Order;
import com.lactobloom.model.OrderDetail;
import com.lactobloom.model.Product;
import com.lactobloom.repository.OrderDetailRepository;
import com.lactobloom.repository.OrderRepository;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.service.interfaces.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public OrderDetailDto saveOrderDetail(OrderDetailDto orderDetailDto, int orderId, int productId) {
        OrderDetail orderDetail = mapToEntity(orderDetailDto);
        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", orderId));
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        product.setStock(product.getStock() - orderDetail.getQuantity());
        Product boughtProduct = productRepository.save(product);
        orderDetail.setOrder(order);
        orderDetail.setProduct(boughtProduct);
        OrderDetail newOrderDetail = orderDetailRepository.save(orderDetail);
        return mapToDto(newOrderDetail);
    }

    @Override
    public List<OrderDetailDto> getOrderDetailsByOrder(int orderId) {
        List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderOrderId(orderId);
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

    @Override
    public OrderDetailDto updateOrderDetail(OrderDetailDto orderDetailDto, int id, int orderId, int productId) {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("OrderDetail", "Id", id));
        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                new ResourceNotFoundException("Order", "Id", orderId));
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        existingOrderDetail.setOrder(order);
        existingOrderDetail.setProduct(product);
        existingOrderDetail.setQuantity(orderDetailDto.getQuantity());
        existingOrderDetail.setTotalPrice(orderDetailDto.getTotalPrice());
        return mapToDto(orderDetailRepository.save(existingOrderDetail));
    }

    @Override
    public void deleteOrderDetail(int id) {
        orderDetailRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("OrderDetail", "Id", id));
        orderDetailRepository.deleteById(id);
    }

    private OrderDetailDto mapToDto (OrderDetail orderDetail){
        OrderDetailDto orderDetailResponse = new OrderDetailDto();
        orderDetailResponse.setOrderDetailId(orderDetail.getOrderDetailId());
        orderDetailResponse.setQuantity(orderDetail.getQuantity());
        orderDetailResponse.setTotalPrice(orderDetail.getTotalPrice());
        return orderDetailResponse;
    }

    private OrderDetail mapToEntity(OrderDetailDto orderDetailDto){
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setQuantity(orderDetailDto.getQuantity());
        orderDetail.setTotalPrice(orderDetailDto.getTotalPrice());
        return orderDetail;
    }
}
