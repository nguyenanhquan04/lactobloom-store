package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

}
