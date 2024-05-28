package com.lactobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "blogCategory")
public class BlogCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Blog_category_id")
    private int blogCategoryId;

    @Column(name = "Blog_category_name", nullable = false)
    private String blogCategoryName;

    @OneToMany(mappedBy = "blogCategory")
    private List<Blog> blogs;
}
