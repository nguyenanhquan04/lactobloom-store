package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

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
    private String categoryName;

    @OneToMany(mappedBy = "category")
    @JsonBackReference
    private List<Product> products;

}
