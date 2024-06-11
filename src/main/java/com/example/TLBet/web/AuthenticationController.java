package com.example.TLBet.web;

import com.example.TLBet.models.auth.AuthenticationResponse;
import com.example.TLBet.models.auth.LoginRequest;
import com.example.TLBet.models.auth.RegisterRequest;
import com.example.TLBet.models.enums.ExceptionEnum;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.models.exeptions.ExpiredTokenException;
import com.example.TLBet.models.exeptions.InvalidTokenException;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.UserOutView;
import com.example.TLBet.models.view.UserView;
import com.example.TLBet.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.TLBet.utils.AuthUtil.validateToken;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) throws UserErrorException {
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
                                                        @RequestParam("username") String username) throws InvalidTokenException, ExpiredTokenException {

        String extractUsername = validateToken(token);
        if(extractUsername == null){
            throw new ExpiredTokenException("Token is invalid or missing.");
        }
        if(extractUsername.equals(username)){
            return ResponseEntity.ok(true);
        }else {
            throw new InvalidTokenException(ExceptionEnum.EXCEPTION_INVALID_TOKEN,
                    new Throwable("Token is invalid or missing."));
        }
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<UserView>> getAllUsers(){
        return ResponseEntity.ok(authenticationService.getAllUsers());
    }
    @GetMapping("/user")
    public ResponseEntity<Long> getUserId(@RequestParam("username") String username){
        return ResponseEntity.ok(authenticationService.getUserIdByUsername(username));
    }

    @GetMapping("/healthCheck")
    @ResponseStatus(HttpStatus.OK)
    public void healthCheckEndpoint(){

    }
}
