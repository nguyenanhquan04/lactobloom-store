package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private int productId;
    private String productName;
    private String description;
    private double price;
    private double discount;
    private int stock;
}
