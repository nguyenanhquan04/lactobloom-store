package com.lactobloom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Token_id")
    private int tokenId;

    @Column(name = "Token", nullable = false)
    @NotNull(message = "token must not be null")
    private String token;

    @Column(name = "Token_type", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "token type must not be null")
    private TokenType tokenType;

    @Column(name = "Expired", nullable = false)
    @NotNull(message = "Expired must not be null")
    private boolean expired;

    @Column(name = "Revoked", nullable = false)
    @NotNull(message = "Revoked must not be null")
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;
}
