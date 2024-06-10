package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private int orderId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private double shippingFee;
    private double totalPrice;
    private LocalDateTime orderDate;
    private String paymentMethod;
}
