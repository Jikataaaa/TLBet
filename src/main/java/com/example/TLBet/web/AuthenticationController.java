package com.example.TLBet.web;

import com.example.TLBet.models.auth.AuthenticationResponse;
import com.example.TLBet.models.auth.LoginRequest;
import com.example.TLBet.models.auth.RegisterRequest;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.models.view.UserView;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final JwtService jwtService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginRequest request
    ){

        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/roleAccess")
    public ResponseEntity<Boolean> getRoleAccess(@RequestParam("token") String token,
                                                 @RequestParam("username") String username,
                                                 @RequestParam("role") String role){

        String extractUsername = validateToken(token);
        if(extractUsername == null){
            return ResponseEntity.ok(false);
        }

        if(username.equals(extractUsername)){
            UserRole userRole = authenticationService.getUserRole(username);
            String roleName = userRole.name();
            if (roleName.equals(role)) {
                return ResponseEntity.ok(true);
            }else if(roleName.equals("ADMIN") && role.equals("USER")){
                return ResponseEntity.ok(true);
            }else {
                return ResponseEntity.ok(false);
            }
        }else{
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("/verifyAuthentication")
    public ResponseEntity<Boolean> verifyAuthentication(@RequestParam("token") String token,
                                                        @RequestParam("username") String username){

        String extractUsername = validateToken(token);
        if(extractUsername == null){
            return ResponseEntity.ok(false);
        }
        if(extractUsername.equals(username)){
            return ResponseEntity.ok(true);
        }else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<UserView>> getAllUsers(){
        return ResponseEntity.ok(authenticationService.getAllUsers());
    }

    private String validateToken(String token){
        String extractUsername;
        try {
            extractUsername = jwtService.extractUsername(token);
        }catch (MalformedJwtException | ExpiredJwtException e){
            return null;
        }
        return extractUsername;
    }


}
