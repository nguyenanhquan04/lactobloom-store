package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

    @Column(name = "Full_name", nullable = false)
    @NotNull(message = "Full name must not be null")
    private String fullName;

    @Column(name = "Email", nullable = false)
    @NotNull(message = "Email must not be null")
    @Email
    @Pattern(regexp = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[\\w.-]+$")
    private String email;

    @Column(name = "Phone", nullable = false)
    @NotNull(message = "Phone must not be null")
    private String phone;

    @Column(name = "Address", columnDefinition = "TEXT", nullable = false)
    @NotNull(message = "Address must not be null")
    private String address;

    @Column(name = "Note", columnDefinition = "TEXT")
    private String note;

    @ManyToOne
    @JoinColumn(name = "Voucher_id")
    private Voucher voucher;

    @Column(name = "Shipping_fee", columnDefinition = "DECIMAL(10, 2) DEFAULT 0", nullable = false)
    @NotNull(message = "Shipping fee must not be null")
    private double shippingFee;

    @Column(name = "Total_price", columnDefinition = "DECIMAL(15, 2) DEFAULT 0", nullable = false)
    @NotNull(message = "Total price must not be null")
    private double totalPrice;

    @Column(name = "Status", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status must not be null")
    private OrderStatus orderStatus;

    @Column(name = "Order_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    @Column(name = "COD", nullable = false)
    @NotNull(message = "COD must not be null")
    private boolean cod;

    @ManyToOne
    @JoinColumn(name = "Staff_id")
    private User staff;

    @Column(name = "Exchange_point", nullable = false)
    @NotNull(message = "Exchange point must not be null")
    private boolean exchangePoint;

    @Column(name = "Deleted", nullable = false)
    @NotNull(message = "Deleted must not be null")
    private boolean deleted;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "order")
    private List<OrderDetail> orderDetails;
}
