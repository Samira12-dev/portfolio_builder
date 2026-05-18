package com.example.Portfolio_builder.service;

import com.example.Portfolio_builder.dto.RegisterUserDTO;
import com.example.Portfolio_builder.entity.User;
import com.example.Portfolio_builder.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final com.example.Portfolio_builder.security.JwtService jwtService;

    public String register(RegisterUserDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email already in use");
        if (userRepository.existsByUsername(dto.getUsername()))
            throw new RuntimeException("Username already taken");

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);

        return jwtService.generateToken(user.getUsername());
    }

    public String login(LoginDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new RuntimeException("Wrong password");
        return jwtService.generateToken(user.getUsername());
    }
}