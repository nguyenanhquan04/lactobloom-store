package com.lactobloom.model;

import jakarta.persistence.*;
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
    private Order order;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    private Product product;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @Column(name = "Total_price", nullable = false)
    private double totalPrice;
}
