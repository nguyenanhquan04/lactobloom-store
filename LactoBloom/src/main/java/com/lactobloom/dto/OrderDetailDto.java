package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {
    private int orderDetailId;
    private String productName;
    private int quantity;
    private double totalPrice;
    private boolean preOrder;
}
