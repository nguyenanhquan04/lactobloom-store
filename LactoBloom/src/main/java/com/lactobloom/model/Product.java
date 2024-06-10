package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Product_id")
    private int productId;

    @Column(name = "Product_name", nullable = false)
    @NotNull(message = "Product name must not be null")
    private String productName;

    @ManyToOne
    @JoinColumn(name = "Brand_id")
    @JsonBackReference
    @NotNull(message = "Brand must not be null")
    private Brand brand;

    @JsonProperty("brandName")
    public String getBrandName() {
        return brand != null ? brand.getBrandName() : null;
    }

    @ManyToOne
    @JoinColumn(name = "Category_id")
    @JsonBackReference
    @NotNull(message = "Category must not be null")
    private Category category;

    @JsonProperty("categoryName")
    public String getCategoryName() {
        return category != null ? category.getCategoryName() : null;
    }

    @Column(name = "Description", length = 10000)
    @NotNull(message = "Description must not be null")
    private String description;

    @Column(name = "Price", nullable = false)
    @NotNull(message = "Price must not be null")
    private double price;

    @Column(name = "Discount", columnDefinition = "DECIMAL(5, 2) DEFAULT 0")
    @NotNull(message = "Discount must not be null")
    private double discount;

    @Column(name = "Stock", nullable = false)
    @NotNull(message = "Stock must not be null")
    private int stock;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference
    private List<Review> reviews;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference
    private List<Image> images;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference
    private List<Wishlist> wishlists;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference
    private List<OrderDetail> orderDetails;
}
