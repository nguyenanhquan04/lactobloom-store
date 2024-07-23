package com.lactobloom.model;

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
    @NotNull(message = "Brand must not be null")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "Category_id")
    @NotNull(message = "Category must not be null")
    private Category category;

    @Column(name = "Description", columnDefinition = "TEXT")
    @NotNull(message = "Description must not be null")
    private String description;

    @Column(name = "Long_description", columnDefinition = "LONGTEXT")
    @NotNull(message = "Long description must not be null")
    private String longDescription;

    @Column(name = "Price", columnDefinition = "DECIMAL(15, 2) DEFAULT 0", nullable = false)
    @NotNull(message = "Price must not be null")
    private double price;

    @Column(name = "Discount", columnDefinition = "DECIMAL(5, 2) DEFAULT 0", nullable = false)
    @NotNull(message = "Discount must not be null")
    private double discount;

    @Column(name = "Stock", nullable = false)
    @NotNull(message = "Stock must not be null")
    private int stock;

    @Column(name = "Pre_order", nullable = false)
    @NotNull(message = "Pre-order must not be null")
    private boolean preOrder;

    @Column(name = "Deleted", nullable = false)
    @NotNull(message = "Deleted must not be null")
    private boolean deleted;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
    private List<ProductReview> productReviews;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
    private List<Image> images;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
    private List<Wishlist> wishlists;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
    private List<OrderDetail> orderDetails;
}
