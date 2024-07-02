package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "blogreview")
public class BlogReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Review_id")
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @NotNull(message = "User must not be null")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Blog_id")
    @NotNull(message = "Blog must not be null")
    private Blog blog;

    @Column(name = "Comment", columnDefinition = "TEXT", nullable = false)
    @NotNull(message = "Comment must not be null")
    private String comment;

    @Column(name = "Review_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime reviewDate;
}
