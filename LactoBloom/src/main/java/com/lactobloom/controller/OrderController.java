package com.lactobloom.controller;

import com.lactobloom.dto.OrderDto;
import com.lactobloom.model.Order;
import com.lactobloom.service.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @PostMapping("/save/user/{userId}/voucher/{voucherId}")
    public ResponseEntity<OrderDto> saveOrder(@RequestBody OrderDto orderDto, @PathVariable int userId, @PathVariable int voucherId) {
        return new ResponseEntity<>(orderService.saveOrder(orderDto, userId, voucherId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<OrderDto> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable int id) {
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/user/{userId}/voucher/{voucherId}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable int id, @PathVariable int userId, @PathVariable int voucherId, @RequestBody OrderDto orderDto) {
        return new ResponseEntity<>(orderService.updateOrder(orderDto, id, userId, voucherId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>("Order deleted successfully!", HttpStatus.OK);
    }
}
