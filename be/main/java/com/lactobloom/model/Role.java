package com.lactobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Role_id")
    private int roleId;

    @Column(name = "Role_name", nullable = false)
    private String roleName;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}