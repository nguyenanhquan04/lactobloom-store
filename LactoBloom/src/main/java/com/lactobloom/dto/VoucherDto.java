package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherDto {
    private int voucherId;
    private double discount;
    private LocalDate startDate;
    private LocalDate expirationDate;
    private boolean status;
}
