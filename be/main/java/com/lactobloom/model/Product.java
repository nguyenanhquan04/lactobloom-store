package com.lactobloom.model;

import jakarta.persistence.*;
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
    private String productName;

    @ManyToOne
    @JoinColumn(name = "Brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "Category_id")
    private Category category;

    @Column(name = "Description")
    private String description;

    @Column(name = "Price", nullable = false)
    private double price;

    @Column(name = "Discount", columnDefinition = "DECIMAL(5, 2) DEFAULT 0")
    private double discount;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;

    @OneToMany(mappedBy = "product")
    private List<Image> images;

    @OneToMany(mappedBy = "product")
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<PreOrder> preOrders;
}
