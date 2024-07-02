package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    private List<Blog> blogs;
}
