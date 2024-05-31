package com.lactobloom.service.interfaces;

import com.lactobloom.model.PreOrder;

import java.util.List;

public interface IPreOrderService {
    PreOrder savePreOrder(PreOrder preOrder);
    List<PreOrder> getAllPreOrders();
    PreOrder getPreOrderById(int id);
    PreOrder updatePreOrder(PreOrder preOrder, int id);
    void deletePreOrder(int id);
}
