package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Brand name must not be null")
    private String brandName;

    @Column(name = "Deleted", nullable = false)
    @NotNull(message = "Deleted must not be null")
    private boolean deleted;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "brand")
    private List<Product> products;
}
