package com.example.TLBet.service;

import com.example.TLBet.models.auth.AuthenticationResponse;
import com.example.TLBet.models.auth.LoginRequest;
import com.example.TLBet.models.auth.RegisterRequest;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.models.view.UserView;

import java.util.List;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);

    UserRole getUserRole(String username);

    User getUserByUsername(String username);

    List<UserView> getAllUsers();

    Long getUserIdByUsername(String username);

}
