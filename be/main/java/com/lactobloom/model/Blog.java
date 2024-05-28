package com.lactobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

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
    private BlogCategory blogCategory;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Content", nullable = false)
    private String content;

    @Column(name = "Publish_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime publishDate;
}
