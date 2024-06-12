package com.lactobloom.controller;

import com.lactobloom.dto.OrderDetailDto;
import com.lactobloom.service.interfaces.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/all")
    public List<OrderDetailDto> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrderDetailDto> getOrderDetailById(@PathVariable int id) {
        return new ResponseEntity<>(orderDetailService.getOrderDetailById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/order/{orderId}/product/{productId}")
    public ResponseEntity<OrderDetailDto> updateOrderDetail(@PathVariable int id, @RequestBody OrderDetailDto orderDetailDto, @PathVariable int orderId, @PathVariable int productId) {
        return new ResponseEntity<>(orderDetailService.updateOrderDetail(orderDetailDto, id, orderId, productId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrderDetail(@PathVariable int id) {
        orderDetailService.deleteOrderDetail(id);
        return new ResponseEntity<>("Order detail deleted successfully!", HttpStatus.OK);
    }
}
