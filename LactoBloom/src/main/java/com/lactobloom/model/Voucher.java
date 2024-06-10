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

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonBackReference
    @NotNull(message = "User must not be null")
    private User user;

    @Column(name = "Discount", nullable = false)
    @NotNull(message = "Discount must not be null")
    private double discount;

    @Column(name = "Start_date", nullable = false)
    @NotNull(message = "Start date must not be null")
    private LocalDate startDate;

    @Column(name = "Expiration_date", nullable = false)
    @NotNull(message = "Expiration date must not be null")
    private LocalDate expirationDate;

    @Column(name = "Status", nullable = false)
    @NotNull(message = "Status must not be null")
    private boolean status;
}
