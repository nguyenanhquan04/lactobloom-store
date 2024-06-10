package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
    private String fullName;

    @ManyToOne
    @JoinColumn(name = "Role_id")
    @JsonBackReference
    private Role role;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Username", nullable = false)
    private String username;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Address")
    private String address;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Avatar")
    private String avatar;

    @Column(name = "Point", columnDefinition = "INT DEFAULT 0")
    private int point;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Chat> chats;

    @OneToMany(mappedBy = "staff")
    @JsonManagedReference
    private List<Chat> staffChats;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Blog> blogs;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Review> reviews;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Voucher> vouchers;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<PreOrder> preOrders;

   
}
