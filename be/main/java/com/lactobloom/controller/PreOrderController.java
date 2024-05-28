package com.lactobloom.controller;

import com.lactobloom.model.PreOrder;
import com.lactobloom.service.interfaces.IPreOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pre-orders")
public class PreOrderController {

    private final IPreOrderService preOrderService;

    public PreOrderController(IPreOrderService preOrderService) {
        this.preOrderService = preOrderService;
    }

    @PostMapping("/save")
    public ResponseEntity<PreOrder> savePreOrder(@RequestBody PreOrder preOrder) {
        return new ResponseEntity<>(preOrderService.savePreOrder(preOrder), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<PreOrder> getAllPreOrders() {
        return preOrderService.getAllPreOrders();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PreOrder> getPreOrderById(@PathVariable int id) {
        return new ResponseEntity<>(preOrderService.getPreOrderById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PreOrder> updatePreOrder(@PathVariable int id, @RequestBody PreOrder preOrder) {
        return new ResponseEntity<>(preOrderService.updatePreOrder(preOrder, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePreOrder(@PathVariable int id) {
        preOrderService.deletePreOrder(id);
        return new ResponseEntity<>("PreOrder deleted successfully!", HttpStatus.OK);
    }
}
