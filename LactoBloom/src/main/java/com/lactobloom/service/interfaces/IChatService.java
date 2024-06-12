package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ChatDto;

import java.util.List;

public interface IChatService {
    ChatDto saveChat(ChatDto chatDto, int user1Id, int user2Id);
    List<ChatDto> getAllChats();
    ChatDto getChatById(int id);
    ChatDto updateChat(ChatDto chatDto, int id, int user1Id, int user2Id);
    void deleteChat(int id);
    List<ChatDto> getChatsBetweenUsers(int user1Id, int user2Id);
}
