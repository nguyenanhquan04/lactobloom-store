package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private User user;

    @Column(name = "Discount", nullable = false)
    @NotNull(message = "Discount must not be null")
    private double discount;

    @Column(name = "Expiration_date", nullable = false)
    @NotNull(message = "Expiration date must not be null")
    private LocalDate expirationDate;

    @Column(name = "Available", nullable = false)
    @NotNull(message = "Available must not be null")
    private boolean available;
}
