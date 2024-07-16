package com.lactobloom.service;

import com.lactobloom.config.JwtService;
import com.lactobloom.dto.AuthenticationDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Role;
import com.lactobloom.model.Token;
import com.lactobloom.model.TokenType;
import com.lactobloom.model.User;
import com.lactobloom.repository.TokenRepository;
import com.lactobloom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationDto.AuthenticationResponse register(AuthenticationDto.RegisterRequest request) {
        var newUser = User.builder()
                .fullName(request.getFullName())
                .role(Role.MEMBER)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone("")
                .address("")
                .point(0)
                .build();
        var savedUser = repository.save(newUser);
        var jwtToken = jwtService.generateToken(newUser, savedUser.getUserId());
        saveUserToken(savedUser, jwtToken);
        return AuthenticationDto.AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationDto.AuthenticationResponse login(AuthenticationDto.AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmailAndDeletedFalse(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user, user.getUserId());
        revokeAllUserTokens(user);
        saveUserToken(user,jwtToken);
        return AuthenticationDto.AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
