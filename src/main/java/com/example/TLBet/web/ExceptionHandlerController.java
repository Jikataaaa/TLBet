package com.example.TLBet.web;

import com.example.TLBet.config.ApiResponse;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.exeptions.ExpiredTokenException;
import com.example.TLBet.models.exeptions.InvalidTokenException;
import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.exeptions.UserErrorException;
import com.example.TLBet.models.view.SystemLogInView;
import com.example.TLBet.service.AuthenticationService;
import com.example.TLBet.service.SystemLogService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Slf4j
@RestControllerAdvice
public class ExceptionHandlerController extends BaseController {


    @Autowired
    private MessageSource messageSource;

    @Autowired
    private SystemLogService systemLogService;

    @Autowired
    private AuthenticationService authenticationService;

    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(UserErrorException.class)
    public ResponseEntity<ApiResponse> handleUserErrorException(UserErrorException ex) {
        createLog(ex);
        ApiResponse response = new ApiResponse(400, ex.getCause().getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ApiResponse> handleInvalidTokenException(MalformedJwtException ex) {

        createLog(ex);
        ApiResponse response = new ApiResponse(401, "Invalid token");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    private void createLog(Exception ex) {
        SystemLogInView systemLogInView = new SystemLogInView();
        systemLogInView.setExceptionName(ex.getClass().getName());
        systemLogInView.setStackTrace(Arrays.toString(ex.getStackTrace()));

        String username = this.getCurrentUserUsername();
        User user = authenticationService.getUserByUsername(username);

        if (user != null) {
            systemLogInView.setUserId(user.getId());
        }

        systemLogService.createSystemLog(systemLogInView);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiResponse> handleExpiredTokenException(ExpiredJwtException ex) {
        createLog(ex);
        ApiResponse response = new ApiResponse(401, "Token expired");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponse> handleInvalidTokenException(InvalidTokenException ex) {
        createLog(ex);
        ApiResponse response = new ApiResponse(401, "Invalid token");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ApiResponse> handleExpiredTokenException(ExpiredTokenException ex) {
        createLog(ex);
        ApiResponse response = new ApiResponse(401, "Token expired");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ExceptionHandler(NoContentException.class)
    public ResponseEntity<ApiResponse> handleExpiredTokenException(NoContentException ex) {
        createLog(ex);
        ApiResponse response = new ApiResponse(204, "no content");
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
