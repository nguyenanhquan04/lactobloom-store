package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_id")
    private int userId;

    @Column(name = "Full_name", nullable = false)
    @NotNull(message = "Full name must not be null")
    private String fullName;

    @ManyToOne
    @JoinColumn(name = "Role_id")
    @JsonBackReference
    @NotNull(message = "Role must not be null")
    private Role role;

    @Column(name = "Email", nullable = false, unique = true)
    @NotNull(message = "Email must not be null")
    @Email
    @Pattern(regexp = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[\\w.-]+$")
    private String email;

    @Column(name = "Password", nullable = false)
    @NotNull(message = "Password must not be null")
    private String password;

    @Column(name = "Phone", nullable = false)
    @NotNull(message = "Phone must not be null")
    private String phone;

    @Column(name = "Address", nullable = false)
    @NotNull(message = "Address must not be null")
    private String address;

    @Column(name = "Point", columnDefinition = "INT DEFAULT 0")
    private int point;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference
    private List<Chat> chats;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "staff")
    @JsonManagedReference
    private List<Chat> staffChats;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference
    private List<Blog> blogs;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference
    private List<Review> reviews;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference
    private List<Wishlist> wishlists;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference
    private List<Voucher> vouchers;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonManagedReference
    private List<Order> orders;
}
