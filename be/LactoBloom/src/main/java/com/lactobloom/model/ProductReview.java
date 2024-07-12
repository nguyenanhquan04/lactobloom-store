package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "productreview")
public class ProductReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Review_id")
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @NotNull(message = "User must not be null")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    @NotNull(message = "Product must not be null")
    private Product product;

    @Column(name = "Rate", nullable = false)
    @NotNull(message = "Rate must not be null")
    private int rate;

    @Column(name = "Comment", columnDefinition = "TEXT", nullable = false)
    @NotNull(message = "Comment must not be null")
    private String comment;

    @Column(name = "Review_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime reviewDate;
}
