package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "User must not be null")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    @JsonBackReference
    @NotNull(message = "Product must not be null")
    private Product product;
}
