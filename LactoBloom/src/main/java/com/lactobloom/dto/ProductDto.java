package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public abstract class ProductDto {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductRequest {
        private int productId;
        private String productName;
        private String description;
        private String longDescription;
        private double price;
        private double discount;
        private int stock;
        private boolean preOrder;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductResponse {
        private int productId;
        private String productName;
        private String brandName;
        private String categoryName;
        private String description;
        private String longDescription;
        private double price;
        private double discount;
        private int stock;
        private boolean preOrder;
    }
}
