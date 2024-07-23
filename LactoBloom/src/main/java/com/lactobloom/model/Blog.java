package com.lactobloom.model;

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
    @NotNull(message = "Blog Category must not be null")
    private BlogCategory blogCategory;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @NotNull(message = "User must not be null")
    private User user;

    @Column(name = "Image_url", nullable = false)
    @NotNull(message = "Image must not be null")
    private String imageUrl;

    @Column(name = "Title", nullable = false)
    @NotNull(message = "Title must not be null")
    private String title;

    @Column(name = "Short_description", columnDefinition = "TEXT", nullable = false)
    @NotNull(message = "Short description must not be null")
    private String shortDescription;

    @Column(name = "Content", columnDefinition = "LONGTEXT", nullable = false)
    @NotNull(message = "Content must not be null")
    private String content;

    @Column(name = "Publish_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime publishDate;

    @Column(name = "Deleted", nullable = false)
    @NotNull(message = "Deleted must not be null")
    private boolean deleted;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "blog")
    private List<BlogReview> blogReviews;
}
