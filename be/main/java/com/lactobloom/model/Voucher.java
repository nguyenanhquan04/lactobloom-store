package com.lactobloom.model;

import com.lactobloom.model.VoucherStatus;
import jakarta.persistence.*;
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
    private User user;

    @Column(name = "Discount", nullable = false)
    private double discount;

    @Column(name = "Start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "Expiration_date", nullable = false)
    private LocalDate expirationDate;

    @Column(name = "Status", nullable = false)
    @Enumerated(EnumType.STRING)
    private VoucherStatus status;
}
