package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Image_id")
    private int imageId;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    @NotNull(message = "Product must not be null")
    private Product product;

    @Column(name = "Image_url", nullable = false)
    @NotNull(message = "Image url must not be null")
    private String imageUrl;
}
