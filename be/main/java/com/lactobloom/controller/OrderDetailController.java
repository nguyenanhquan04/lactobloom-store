package com.lactobloom.controller;

import com.lactobloom.model.OrderDetail;
import com.lactobloom.service.interfaces.IOrderDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
public class OrderDetailController {

    private final IOrderDetailService orderDetailService;

    public OrderDetailController(IOrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @PostMapping("/save")
    public ResponseEntity<OrderDetail> saveOrderDetail(@RequestBody OrderDetail orderDetail) {
        return new ResponseEntity<>(orderDetailService.saveOrderDetail(orderDetail), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable int id) {
        return new ResponseEntity<>(orderDetailService.getOrderDetailById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable int id, @RequestBody OrderDetail orderDetail) {
        return new ResponseEntity<>(orderDetailService.updateOrderDetail(orderDetail, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrderDetail(@PathVariable int id) {
        orderDetailService.deleteOrderDetail(id);
        return new ResponseEntity<>("Order detail deleted successfully!", HttpStatus.OK);
    }
}
