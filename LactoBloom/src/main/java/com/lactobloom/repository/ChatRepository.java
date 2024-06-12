package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Chat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    @Query("SELECT c FROM Chat c WHERE (c.user1.userId = :user1Id AND c.user2.userId = :user2Id) OR (c.user1.userId = :user2Id AND c.user2.userId = :user1Id) ORDER BY c.chatId")
    List<Chat> findChatsBetweenUsers(@Param("user1Id") int user1Id, @Param("user2Id") int user2Id);
}
