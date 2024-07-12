package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "orderdetail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_detail_id")
    private int orderDetailId;

    @ManyToOne
    @JoinColumn(name = "Order_id")
    @NotNull(message = "Order must not be null")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    @NotNull(message = "Product must not be null")
    private Product product;

    @Column(name = "Quantity", nullable = false)
    @NotNull(message = "Quantity must not be null")
    private int quantity;

    @Column(name = "Total_price", columnDefinition = "DECIMAL(10, 2) DEFAULT 0", nullable = false)
    @NotNull(message = "Total price must not be null")
    private double totalPrice;

    @Column(name = "Pre_order", nullable = false)
    @NotNull(message = "Pre-order must not be null")
    private boolean preOrder;
}
