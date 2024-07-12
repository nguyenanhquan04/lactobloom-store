package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Blog category name must not be null")
    private String blogCategoryName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "blogCategory")
    private List<Blog> blogs;
}
