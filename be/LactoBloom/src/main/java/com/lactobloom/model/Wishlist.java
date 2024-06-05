package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Wishlist_id")
    private int wishlistId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    @JsonBackReference
    private Product product;
}
