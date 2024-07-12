package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogReviewDto {
    private int reviewId;
    private String email;
    private String comment;
    private LocalDateTime reviewDate;
}
