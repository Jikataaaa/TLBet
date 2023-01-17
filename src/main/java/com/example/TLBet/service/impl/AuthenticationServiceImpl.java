package com.example.TLBet.service.impl;

import com.example.TLBet.models.auth.AuthenticationResponse;
import com.example.TLBet.models.auth.LoginRequest;
import com.example.TLBet.models.auth.RegisterRequest;
import com.example.TLBet.models.entities.Role;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.repository.UserRepository;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        Role role = Role.builder().role(UserRole.USER).build();
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(token)
                .build();
    }

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = userRepository.findUserByUsername(request.getUsername()).orElseThrow();

        String token = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(token)
                .build();
    }
}
