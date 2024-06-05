package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Chat;
import com.lactobloom.repository.ChatRepository;
import com.lactobloom.service.interfaces.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService implements IChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Chat saveChat(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    @Override
    public Chat getChatById(int id) {
        return chatRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Chat", "Id", id));
    }

    @Override
    public Chat updateChat(Chat chat, int id) {
        Chat existingChat = chatRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Chat", "Id", id));

        existingChat.setMessage(chat.getMessage());
        // Update other fields as needed
        return chatRepository.save(existingChat);
    }

    @Override
    public void deleteChat(int id) {
        chatRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Chat", "Id", id));
        chatRepository.deleteById(id);
    }
}
