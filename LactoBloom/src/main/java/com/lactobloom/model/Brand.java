package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "brand")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Brand_id")
    private int brandId;

    @Column(name = "Brand_name", nullable = false)
    private String brandName;

    @OneToMany(mappedBy = "brand")
    @JsonManagedReference
    private List<Product> products;
}
