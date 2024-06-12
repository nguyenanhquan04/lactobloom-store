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
    @JoinColumn(name = "User1_id")
    @JsonBackReference
    @NotNull(message = "User1 must not be null")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "User2_id")
    @JsonBackReference
    @NotNull(message = "User2 must not be null")
    private User user2;

    @Column(name = "Message", nullable = false)
    @NotNull(message = "Message must not be null")
    private String message;

    @Column(name = "Timestamp", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime timestamp;
}
