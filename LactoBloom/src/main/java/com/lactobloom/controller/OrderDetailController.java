package com.lactobloom.controller;

import com.lactobloom.dto.OrderDetailDto;
import com.lactobloom.service.interfaces.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-detail")
public class OrderDetailController {

    @Autowired
    private IOrderDetailService orderDetailService;

    @PostMapping("/save/order/{orderId}/product/{productId}")
    public ResponseEntity<OrderDetailDto> saveOrderDetail(@RequestBody OrderDetailDto orderDetailDto, @PathVariable int orderId, @PathVariable int productId) {
        return new ResponseEntity<>(orderDetailService.saveOrderDetail(orderDetailDto, orderId, productId), HttpStatus.CREATED);
    }

    @GetMapping("/myOrder/{orderId}")
    public List<OrderDetailDto> getOrderDetailsByOrderForMember(@PathVariable int orderId) {
        return orderDetailService.getOrderDetailsByOrderForMember(orderId);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/order/{orderId}")
    public List<OrderDetailDto> getOrderDetailsByOrderForStaff(@PathVariable int orderId) {
        return orderDetailService.getOrderDetailsByOrder(orderId);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/all")
    public List<OrderDetailDto> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<OrderDetailDto> getOrderDetailById(@PathVariable int id) {
        return new ResponseEntity<>(orderDetailService.getOrderDetailById(id), HttpStatus.OK);
    }
}
