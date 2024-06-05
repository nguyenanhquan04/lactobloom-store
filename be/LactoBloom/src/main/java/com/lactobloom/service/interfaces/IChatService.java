package com.lactobloom.service.interfaces;

import com.lactobloom.model.Chat;

import java.util.List;

public interface IChatService {
    Chat saveChat(Chat chat);
    List<Chat> getAllChats();
    Chat getChatById(int id);
    Chat updateChat(Chat chat, int id);
    void deleteChat(int id);
}
