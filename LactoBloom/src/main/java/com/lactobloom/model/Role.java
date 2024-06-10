package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Role name must not be null")
    private String roleName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "role")
    @JsonManagedReference
    private List<User> users;
}