package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference
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

    @Column(name = "Address", nullable = false)
    @NotNull(message = "Address must not be null")
    private String address;

    @ManyToOne
    @JoinColumn(name = "Voucher_id")
    @JsonBackReference
    private Voucher voucher;

    @Column(name = "Shipping_fee", nullable = false)
    @NotNull(message = "Shipping fee must not be null")
    private double shippingFee;

    @Column(name = "Total_price", nullable = false)
    @NotNull(message = "Total price must not be null")
    private double totalPrice;

    @Column(name = "Order_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    @JsonManagedReference
    private List<OrderDetail> orderDetails;
}
