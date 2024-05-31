package com.lactobloom.controller;

import com.lactobloom.model.Chat;
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

    @PostMapping("/save")
    public ResponseEntity<Chat> saveChat(@RequestBody Chat chat) {
        return new ResponseEntity<>(chatService.saveChat(chat), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Chat> getChatById(@PathVariable int id) {
        return new ResponseEntity<>(chatService.getChatById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Chat> updateChat(@PathVariable int id, @RequestBody Chat chat) {
        return new ResponseEntity<>(chatService.updateChat(chat, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteChat(@PathVariable int id) {
        chatService.deleteChat(id);
        return new ResponseEntity<>("Chat deleted successfully!", HttpStatus.OK);
    }
}
