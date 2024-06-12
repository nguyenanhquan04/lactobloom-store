package com.lactobloom.service;

import com.lactobloom.dto.ChatDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Chat;
import com.lactobloom.model.User;
import com.lactobloom.repository.ChatRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService implements IChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ChatDto saveChat(ChatDto chatDto, int user1Id, int user2Id) {
        Chat chat = mapToEntity(chatDto);
        User user1 = userRepository.findById(user1Id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", user1Id));
        User user2 = userRepository.findById(user2Id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", user2Id));
        chat.setUser1(user1);
        chat.setUser2(user2);
        chat.setTimestamp(LocalDateTime.now());
        Chat newChat = chatRepository.save(chat);
        return mapToDto(newChat);
    }

    @Override
    public List<ChatDto> getAllChats() {
        List<Chat> chatList = chatRepository.findAll();
        return chatList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ChatDto getChatById(int id) {
        Chat chat = chatRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Chat", "Id", id));
        return mapToDto(chat);
    }

    @Override
    public ChatDto updateChat(ChatDto chatDto, int id, int user1Id, int user2Id) {
        Chat existingChat = chatRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Chat", "Id", id));
        User user1 = userRepository.findById(user1Id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", user1Id));
        User user2 = userRepository.findById(user2Id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", user2Id));
        existingChat.setUser1(user1);
        existingChat.setUser2(user2);
        existingChat.setMessage(chatDto.getMessage());
        existingChat.setTimestamp(LocalDateTime.now());
        return mapToDto(chatRepository.save(existingChat));
    }

    @Override
    public void deleteChat(int id) {
        chatRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Chat", "Id", id));
        chatRepository.deleteById(id);
    }

    @Override
    public List<ChatDto> getChatsBetweenUsers(int user1Id, int user2Id) {
        List<Chat> chatList = chatRepository.findChatsBetweenUsers(user1Id, user2Id);
        return chatList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ChatDto mapToDto (Chat chat){
        ChatDto chatResponse = new ChatDto();
        chatResponse.setChatId(chat.getChatId());
        chatResponse.setMessage(chat.getMessage());
        chatResponse.setTimestamp(chat.getTimestamp());
        return chatResponse;
    }

    private Chat mapToEntity(ChatDto chatDto){
        Chat chat = new Chat();
        chat.setMessage(chatDto.getMessage());
        return chat;
    }
}
