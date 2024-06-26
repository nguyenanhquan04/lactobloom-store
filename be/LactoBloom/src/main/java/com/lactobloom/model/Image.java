package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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
    @JsonBackReference
    private Product product;

    @Column(name = "Image_url", nullable = false)
    private String imageUrl;
}
