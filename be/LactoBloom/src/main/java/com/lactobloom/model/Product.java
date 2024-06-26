package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Collections;
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
    private String productName;

    @ManyToOne
    @JoinColumn(name = "Brand_id")
    @JsonBackReference
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "Category_id")
    @JsonBackReference
    private Category category;

    // Getter mới cho brandName
    @JsonProperty("brandName")
    public List<String> getBrandName() {
        return brand != null ? Collections.singletonList(brand.getBrandName()) : null;
    }

    // Getter mới cho categoryName
    @JsonProperty("categoryName")
    public List<String> getCategoryName() {
        return category != null ? Collections.singletonList(category.getCategoryName()) : null;
    }

    @Column(name = "Description", length = 1000)
    private String description;

    @Column(name = "Price", nullable = false)
    private double price;

    @Column(name = "Discount", columnDefinition = "DECIMAL(5, 2) DEFAULT 0")
    private double discount;

    @Column(name = "Stock", nullable = false)
    private int stock;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<Review> reviews;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<Image> images;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<PreOrder> preOrders;
}
