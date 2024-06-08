package com.example.TLBet.service.impl;

import com.example.TLBet.models.auth.AuthenticationResponse;
import com.example.TLBet.models.auth.LoginRequest;
import com.example.TLBet.models.auth.RegisterRequest;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.ExceptionEnum;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.UserOutView;
import com.example.TLBet.models.view.UserView;
import com.example.TLBet.repository.UserRepository;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;


    @Override
    public AuthenticationResponse register(@Valid RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);

        return AuthenticationResponse
                .builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public AuthenticationResponse login(@Valid LoginRequest request) {
        User user = userRepository.findUserByUsername(request.getUsername()).orElseThrow();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public UserRole getUserRole(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow();
        return user.getRole();
    }

    @Override
    public User getUserByUsername(String username) {
        Optional<User> userByUsername = userRepository.findUserByUsername(username);
        return userByUsername.orElse(null);
    }

    @Override
    public UserOutView getUserByName(String username) throws UserErrorException {
        User userByUsername = userRepository.findUserByUsername(username).orElse(null);

        if (userByUsername != null) {
            return modelMapper.map(userByUsername, UserOutView.class);
        }

        throw new UserErrorException(ExceptionEnum.EXCEPTION_USER_NOT_FOUND,
                new Throwable("User with username " + username + " not found"));
    }

    @Override
    public List<UserView> getAllUsers() {
        return userRepository.findAll().stream().map(user -> UserView
                        .builder()
                        .id(user.getId())
                        .name(user.getUsername())
                        .build())
                .toList();
    }

    @Override
    public Long getUserIdByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow();
        return user.getId();
    }
}
