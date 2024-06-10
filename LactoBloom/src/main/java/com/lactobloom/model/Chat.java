package com.lactobloom.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Chat_id")
    private int chatId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonBackReference
    @NotNull(message = "User must not be null")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Staff_id")
    @JsonBackReference
    @NotNull(message = "Staff must not be null")
    private User staff;

    @Column(name = "Message", nullable = false)
    @NotNull(message = "Message must not be null")
    private String message;

    @Column(name = "Timestamp", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime timestamp;
}
