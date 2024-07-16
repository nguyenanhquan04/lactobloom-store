package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Category_id")
    private int categoryId;

    @Column(name = "Category_name", nullable = false)
    @NotNull(message = "Category name must not be null")
    private String categoryName;

    @Column(name = "Deleted", nullable = false)
    @NotNull(message = "Deleted must not be null")
    private boolean deleted;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "category")
    private List<Product> products;
}
