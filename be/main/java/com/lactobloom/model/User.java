package com.lactobloom.model;

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
    private Role role;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

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
    private List<Chat> chats;

    @OneToMany(mappedBy = "staff")
    private List<Chat> staffChats;

    @OneToMany(mappedBy = "user")
    private List<Blog> blogs;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews;

    @OneToMany(mappedBy = "user")
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "user")
    private List<Voucher> vouchers;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<PreOrder> preOrders;
}
