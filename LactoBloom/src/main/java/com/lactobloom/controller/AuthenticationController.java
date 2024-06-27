package com.lactobloom.controller;

import com.lactobloom.dto.AuthenticationDto;
import com.lactobloom.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationDto.AuthenticationResponse> register(@RequestBody AuthenticationDto.RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationDto.AuthenticationResponse> login(@RequestBody AuthenticationDto.AuthenticationRequest request) {
        return ResponseEntity.ok(service.login(request));
    }
}
