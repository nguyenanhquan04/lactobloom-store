package com.lactobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_id")
    private int orderId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Voucher_id")
    private Voucher voucher;

    @Column(name = "Shipping_fee", nullable = false)
    private double shippingFee;

    @Column(name = "Total_price", nullable = false)
    private double totalPrice;

    @Column(name = "Order_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    @Column(name = "Payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "Shipping_address", nullable = false)
    private String shippingAddress;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;
}
