package com.lactobloom.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "otp")
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Otp_id")
    private int otpId;

    @Column(name = "Otp", nullable = false)
    private int otp;

    @Column(name = "Expiration_Time", nullable = false)
    private Date expirationTime;

    @OneToOne
    @JoinColumn(name = "User_id")
    private User user;
}
