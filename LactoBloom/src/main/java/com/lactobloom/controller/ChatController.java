package com.lactobloom.controller;

import com.lactobloom.dto.ChatDto;
import com.lactobloom.service.interfaces.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private IChatService chatService;

    @PostMapping("/save/user1/{user1Id}/user2/{user2Id}")
    public ResponseEntity<ChatDto> saveChat(@RequestBody ChatDto chatDto, @PathVariable int user1Id, @PathVariable int user2Id) {
        return new ResponseEntity<>(chatService.saveChat(chatDto, user1Id, user2Id), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<ChatDto> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ChatDto> getChatById(@PathVariable int id) {
        return new ResponseEntity<>(chatService.getChatById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/user1/{user1Id}/user2/{user2Id}")
    public ResponseEntity<ChatDto> updateChat(@PathVariable int id, @PathVariable int user1Id, @PathVariable int user2Id, @RequestBody ChatDto chatDto) {
        return new ResponseEntity<>(chatService.updateChat(chatDto, id, user1Id, user2Id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteChat(@PathVariable int id) {
        chatService.deleteChat(id);
        return new ResponseEntity<>("Chat deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/chatList/user1/{user1Id}/user2/{user2Id}")
    public List<ChatDto> getChatsByUser1IdAndUser2Id(@PathVariable int user1Id, @PathVariable int user2Id) {
        return chatService.getChatsBetweenUsers(user1Id, user2Id);
    }
}
