package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "voucher")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Voucher_id")
    private int voucherId;

    @Column(name = "Point", nullable = false)
    @NotNull(message = "Point must not be null")
    private int point;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;

    @Column(name = "Discount", columnDefinition = "DECIMAL(5, 2) DEFAULT 0", nullable = false)
    @NotNull(message = "Discount must not be null")
    private double discount;

    @Column(name = "Expiration_date", nullable = false)
    @NotNull(message = "Expiration date must not be null")
    private LocalDate expirationDate;

    @Column(name = "Available", nullable = false)
    @NotNull(message = "Available must not be null")
    private boolean available;

    @Column(name = "Deleted", nullable = false)
    @NotNull(message = "Deleted must not be null")
    private boolean deleted;
}
