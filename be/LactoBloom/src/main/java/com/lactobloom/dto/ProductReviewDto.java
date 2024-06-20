package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductReviewDto {
    private int reviewId;
    private String email;
    private int rate;
    private String comment;
    private LocalDateTime reviewDate;
}
