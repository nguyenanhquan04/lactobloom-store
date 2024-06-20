package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Blog_id")
    private int blogId;

    @ManyToOne
    @JoinColumn(name = "Blog_category_id")
    @JsonBackReference
    @NotNull(message = "Blog Category must not be null")
    private BlogCategory blogCategory;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonBackReference
    @NotNull(message = "User must not be null")
    private User user;

    @Column(name = "Title", nullable = false)
    @NotNull(message = "Title must not be null")
    private String title;

    @Column(name = "Content", columnDefinition = "TEXT", nullable = false)
    @NotNull(message = "Content must not be null")
    private String content;

    @Column(name = "Publish_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime publishDate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "blog")
    @JsonManagedReference
    private List<BlogReview> blogReviews;
}
