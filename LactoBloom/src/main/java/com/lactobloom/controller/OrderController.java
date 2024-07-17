package com.lactobloom.controller;

import com.lactobloom.dto.OrderDto;
import com.lactobloom.service.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @PostMapping("/save")
    public ResponseEntity<OrderDto> saveOrder(@RequestBody OrderDto orderDto, @RequestParam(required = false) Integer voucherId) {
        return new ResponseEntity<>(orderService.saveOrder(orderDto, voucherId), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<OrderDto> getAllOrders() {return orderService.getAllOrders();}

    @GetMapping("/myOrders")
    public List<OrderDto> getOrdersByUser() {return orderService.getOrdersByUser();}

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/staffOrders")
    public List<OrderDto> getOrdersByStaff() {return orderService.getOrdersByStaff();}

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable int id) {
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }

    @PutMapping("/{orderId}/total")
    public ResponseEntity<OrderDto> calculateTotalPrice(@PathVariable int orderId) {
        return new ResponseEntity<>(orderService.calculateTotalPrice(orderId), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/deliver/{id}")
    public ResponseEntity<OrderDto> deliverOrder(@PathVariable int id) {
        return new ResponseEntity<>(orderService.deliverOrder(id), HttpStatus.OK);
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<OrderDto> cancelOrder(@PathVariable int id) {
        return new ResponseEntity<>(orderService.cancelOrder(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable int id, @RequestBody OrderDto orderDto, @RequestParam(required = false) Integer staffId) {
        return new ResponseEntity<>(orderService.updateOrder(orderDto, id, staffId), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>("Order deleted successfully!", HttpStatus.OK);
    }
}
