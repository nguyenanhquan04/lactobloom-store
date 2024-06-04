package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "preorder")
public class PreOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PreOrder_id")
    private int preOrderId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    @JsonBackReference
    private Product product;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @Column(name = "PreOrder_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime preOrderDate;

    @Column(name = "Status", nullable = false)
    @Enumerated(EnumType.STRING)
    private PreOrderStatus status;
}
