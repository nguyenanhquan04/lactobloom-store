package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.PreOrder;
import com.lactobloom.repository.PreOrderRepository;
import com.lactobloom.service.interfaces.IPreOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreOrderService implements IPreOrderService {

    @Autowired
    private PreOrderRepository preOrderRepository;

    @Override
    public PreOrder savePreOrder(PreOrder preOrder) {
        return preOrderRepository.save(preOrder);
    }

    @Override
    public List<PreOrder> getAllPreOrders() {
        return preOrderRepository.findAll();
    }

    @Override
    public PreOrder getPreOrderById(int id) {
        return preOrderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("PreOrder", "Id", id));
    }

    @Override
    public PreOrder updatePreOrder(PreOrder preOrder, int id) {
        PreOrder existingPreOrder = preOrderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("PreOrder", "Id", id));

        existingPreOrder.setQuantity(preOrder.getQuantity());
        existingPreOrder.setStatus(preOrder.getStatus());
        // Update other fields as needed
        return preOrderRepository.save(existingPreOrder);
    }

    @Override
    public void deletePreOrder(int id) {
        preOrderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("PreOrder", "Id", id));
        preOrderRepository.deleteById(id);
    }
}
